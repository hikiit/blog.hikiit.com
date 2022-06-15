---
title: "Flutter Firestoreで複数ドキュメントに渡るTransactionを張る方法"
date: "2019-07-04T00:12:02+09:00"
tags: ["Flutter", "Firestore"]
---

Firestore のトランザクションを複数のドキュメントに張る方法です。

1 つのドキュメントを読み取り、その後同じドキュメントで書くような場合は単純です。(例えばインクリメント)

トランザクション内で get した後に update もしくは set すればいいだけですね。

```dart
final CollectionReference booksRef = _db.collection('/books');

await _db.runTransaction((Transaction tx) async {
  print('Transaction start');
  DocumentSnapshot book1Snapshot = await tx.get(booksRef.document('book1'));

  if (book1Snapshot.exists) {
    await tx.update(booksRef.document('book1'),
       <String, dynamic>{'title': 'book_title1'});
  }
}).then((value) {
  // 成功した時の処理
  print('ok');
}).catchError((err) {
  // 失敗した時の処理
  print(err);
});
```

## 複数のドキュメントに渡らせる

ドキュメント A の値を元にドキュメント B の値を変える場合はどうしましょう。

例えば、本 A のタイトルを本 B にも同じタイトルでセットするとします。  
素直に book1 のタイトルを取得して book2 を update すればよさそうです。

```dart
final book1 = await _db.collection('counters').document('counter1').get();
final titleBook1 = book1['title'];

await _db.collection('books').document('book2').updateData(<String, dynamic>{'title': titleBook1});
```

ではここに「book1 のタイトルは時折変更されることがある」と条件をつけた場合はどうしましょう。

仮に上記の例で book1 を取得した直後に book1 のタイトルが変わってしまった場合、  
book1 と book2 のタイトルが異なってしまいます。

### トランザクションを使う

それを防ぐ用途としても、トランザクションは便利です。  
トランザクションでは読み取ったドキュメントが変更された場合、処理中のトランザクションを一度ロールバックして初めからやり直します。

それなら book1 と book2 で異なってしまうことはありませんね。  
シンプルに実装してみます。

```dart
final CollectionReference booksRef = _db.collection('/books');

await _db.runTransaction((Transaction tx) async {
  print('Transaction start');
  DocumentSnapshot book1Snapshot = await tx.get(booksRef.document('book1'));

  if (book1Snapshot.exists) {
    await tx.update(booksRef.document('book2'),
        <String, dynamic>{'title': book1Snapshot.data['title']});
  }
}).then((value) {
  // 成功した時の処理
  print('ok');
}).catchError((err) {
  // 失敗した時の処理
  print(err);
});
```

しかし残念ながらこれでは動きません。トランザクションが複数回試行された後に、以下のエラーが吐き出されます。

```
PlatformException(9, Transaction failed all retries.: Every document read in a transaction must also be written in that transaction., null)
```

トランザクション内で read したドキュメントはは必ずその後 write しなければいけないようです。

公式ドキュメントには以下のように記載されています。

> トランザクションを使用する場合は、次の点に注意してください。
>
> - 読み取りオペレーションは書き込みオペレーションの前に実行する必要があります。
> - トランザクションが読み取るドキュメントに対して同時編集が影響する場合は、トランザクションを呼び出す関数（トランザクション関数）が複数回実行されることがあります。
> - トランザクション関数はアプリケーションの状態を直接変更してはなりません。
> - クライアントがオフラインの場合、トランザクションは失敗します。

その中のこの一文について

> 読み取りオペレーションは書き込みオペレーションの前に実行する必要があります。

私は「書き込みたいならその前に読み取ってね」「読むだけなら別にルールはないよ」としか捉えられなかったのですが、英文だと下記のようになっています。

> Read operations must come before write operations.

これなら Read 後には write が必須と読めなくもないですね。英語大事。

コードに反映してみます。  
「何も書かない write」の方法がわからなかったので、とりあえず同じ値で update しました。

```dart
await _db.runTransaction((Transaction tx) async {
  print('Transaction start');
  DocumentSnapshot book1Snapshot = await tx.get(booksRef.document('book1'));

  if (book1Snapshot.exists) {
    await tx.update(booksRef.document('book1'),
        <String, dynamic>{'title': book1Snapshot.data['title']});
    await tx.update(booksRef.document('book2'),
        <String, dynamic>{'title': book1Snapshot.data['title']});
  }
}).then((value) {
  print('ok');
}).catchError((err) {
  print(err);
});
```

無事 Firestore に反映されました。

ちなみに、私はこのルールに気づかずにハマっていました。

## 参考にさせていただいたサイト

https://firebase.google.com/docs/firestore/manage-data/transactions

https://stackoverflow.com/questions/54189298/update-multiple-documents-in-a-single-transaction-with-dart-and-firestore
