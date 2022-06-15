---
title: "Cloud Firestoreでミニブログの構成を考える"
date: "2019-05-15T01:04:11+09:00"
tags: ["Firebase"]
---

NoSQL である Firestore でミニブログを作るときの構成を考えます。

Firestore の組み方を勉強中ですので、自分の整理のために書いています。

## ミニブログを考える

例として、ツイッターのようなつぶやきサービスについて考えます。

### 仕様

- つぶやきを投稿できる
- 他人をフォローできる
- フォロワーを確認できる
- 特定ユーザーのつぶやきだけを見られる
- フォローしているユーザーのつぶやきだけを見られる

### 覚えておかなければいけないルール

- 1 つのドキュメントは最大 1MB
- フィールドに値は 20000 個まで(配列/Map の一要素も 1 つとカウント)
- ドキュメントへは 1 秒 1 回の書き込み制限がある
- 課金は Read/Write のドキュメント数

### 1 つのドキュメントにまとめる

ユーザーコレクションでユーザー 1 人につき 1 ドキュメント与えられ、  
ドキュメントはツイートの内容を配列として持ちます。

```
User
    user001{
        id:user001,
        tweets:[tweet1, tweet2, tweet3],
        followee:[user002, user003, user004],
        follower:[user007, user008, user009]
    }
```

#### 問題点

以下の問題が挙げられます。

**1MB 制限/20000 制限**

ツイート数が増えていくと、いずれ容量/個数制限に引っかかってしまいます。

他にも問題点はありますが、後述します。

### ツイートをサブコレクションにする

tweets サブコレクションを用意し、1 つのツイートを 1 つのドキュメントとして作成します。

サブコレクションであれば、User ドキュメントの 1MB 制限/20000 制限に引っかからないのでうまくいきそうですね。

```
User
    user001{
        id:user001,
        tweets
            tweet1{
                tweetid:001,
                tweet_text:"ついーーと",
                }
            tweet2{
                tweetid:001,
                tweet_text:"ついーーと2",
                }
            tweet3{
                tweetid:001,
                tweet_text:"ついーーと3",
                }
        followee:[user002, user003, user004],
        follower:[user007, user008, user009]
    }
```

#### 問題点

**例えば全ユーザーから全てのツイートを取得しようと大変...でした。**少し前まで。

今まではコレクション間を超えて Query を出すことはできないため、全ツイートを取得するには下記のような Query を出す必要がありました。

```
db.collection("User").document("user001").collection("tweets")
```

ですが最近のアップデートで、同じコレクション名であれば横断的に Query を出すことができるようになりました。

もちろんよくある手法の通りにツイートコレクションを Root 直下に置くのもいいですね。その際には所有者もフィードで示す必要があります。

```
User
    user001{
        id:user001,
        followee:[user002, user003, user004],
        follower:[user007, user008, user009]
    }
    user002{
        id:user002,
        followee:[user001, user003, user004],
        follower:[user001, user008, user009]
    }
Tweets
    tweet1{
        tweetid:001,
        author:user001,
        tweet_text:"ついーーと"
    }
    tweet2{
        tweetid:002,
        author:user002,
        tweet_text:"ついーーと2"
    }
    tweet3{
        tweetid:003,
        author:user003,
        tweet_text:"ついーーと3"
    }
```

見たところいい感じですが、問題点はまだあります。

followee と follower をリストで持っていますと、以下のような問題点が考えられます。

**1MB 制限/20000 制限**

フォロー / フォロワーに制限が出てしまいます。2 万フォロワーなんて世の中たくさんいます。

**同期問題**

例えば user001 が user002 のフォローを外したとします。  
すると user001 ドキュメントの followee から user002 を外すだけではなく、user002 ドキュメントの follower から user001 を外すこともしないといけません。面倒ですね。

### User/ツイート/フォロー/フォロワーのコレクションをすべて Root に置く

全てを Root に置きました。

これなら 1MB/20000 制限にも掛かりません。

また、フォローフォロワーの更新は 1 つのドキュメント変更で済みます。

フォロー数の取得は下記でまとめて取得できます。

```
where(u'followee', u'==', u'user001')
```

いい感じですね。

```
User
    user001{
        id:user001,
        followee:[user002, user003, user004],
        follower:[user007, user008, user009]
    }
    user002{
        id:user002,
        followee:[user001, user003, user004],
        follower:[user001, user008, user009]
    }
Tweets
    tweet1{
        tweetid:001,
        author:user001,
        tweet_text:"ついーーと"
    }
    tweet2{
        tweetid:002,
        author:user002,
        tweet_text:"ついーーと2"
    }
    tweet3{
        tweetid:003,
        author:user003,
        tweet_text:"ついーーと3"
    }
Follow
    follow1{
        followee:user001,
        follower:user002
    }
    follow2{
        followee:user001,
        follower:user002
    }
    follow3{
        followee:user001,
        follower:user002
    }
```

NoSQL で冗長性を持たせることは別に変なことではないので、Root に Tweets コレクションを用意し、User ドキュメントにも同じ Tweets サブコレクションを置く考え方も間違っていないと思います。

### 参考させていただいたサイト

[Cloud Firestore の勘所 パート 2 — データ設計. 投稿型のブログサービスを設計しながらデータ構造について考える | by mono  | google-cloud-jp | Medium](https://medium.com/google-cloud-jp/firestore2-920ac799345c)

[待ち焦がれた CollectionGroup が Cloud Firestore へやってきた。 - Qiita](https://qiita.com/1amageek/items/343f262ba3b50e657078)

[How to Structure Your Data | Get to know Cloud Firestore #5 - YouTube](https://www.youtube.com/watch?v=haMOUb3KVSo&list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ&index=5)

[【Firebase】Cloud Firestore のデータ構造の決め方を Firebase の動画から学ぶ - Qiita](https://qiita.com/shiz/items/5f4c8ae19083ccdd46b2)
