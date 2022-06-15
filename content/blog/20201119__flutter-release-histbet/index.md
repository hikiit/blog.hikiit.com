---
title: "Flutterで競馬収支管理アプリを作成しました"
date: "2020-11-19T22:47:17+09:00"
tags: ["Flutter"]
---

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">iOS/Androidアプリ「HistBet」をリリースしました🎉<br><br>競馬の収支を &quot;見やすく&quot; 管理できます！<br><br>月間成績やグラフで振り返ることもできるので、競馬が好きな方はぜひともインストールしてみてください✨<a href="https://t.co/2BvXRWdVD5">https://t.co/2BvXRWdVD5</a><a href="https://t.co/OIuFtrmSC4">https://t.co/OIuFtrmSC4</a> <a href="https://t.co/ziD0KIYhEv">pic.twitter.com/ziD0KIYhEv</a></p>&mdash; hiknot (@hiknot18) <a href="https://twitter.com/hiknot18/status/1325766347100282880?ref_src=twsrc%5Etfw">November 9, 2020</a></blockquote>

個人開発として終業後と土日を利用してコツコツ実装していたモバイルアプリですが、ようやく公開することができました。

アプリの目的からして対象ユーザーは限られますが、もし競馬が趣味であればぜひとも試していただきたいです。

さて、初版リリースを達成したところで、HistBet を作成するまでに利用した技術やサービスを共有したいと思います。

## 作成するに至った経緯

私は趣味で競馬(主にネット投票)を楽しんでいるのですが、結局自分がいくら勝っているのか、あるいは負けているのかを把握していませんでした。

自分のリターンを把握していない賭け事ほど愚かなものはありません。

そこでマネーフォワードのようにアプリで収支を管理できたら便利だと考えて探してみたのですが、自分の納得いくアプリが見つからなかったため、「だったら自分が納得するアプリを作ろう！」に至りました。

## 使った技術やサービス

- Flutter
- Firebase
  - Firestore
  - Cloud Functions for Firebase
- Codemagic + GitHub

### Flutter

HistBet は iOS/Android 両プラットフォーム向けにリリースしていますが、それを可能にしたのは Flutter のおかげです。多少の分岐はありますが、8-9 割を共通のコードで作成できています。

構成としては ChangeNotifier + Provider を採用しました。シンプルに書けそうですし、ある程度規模が大きくなっても問題ない手法と考えての採用です。ただ Flutter は進化が早いので、この設計に固執せずにいたいとは思います。

結果的には楽しく進められたので、Flutter の選択は正解でした。

### Firebase

- ユーザのアカウント管理 (Firebase Auth + Firestore)
  - Google サインイン
  - Apple サインイン
  - 匿名認証
- ユーザーデータ管理 (Firebase Auth + Firestore)
  - 収支管理
  - 馬券管理
- 課金管理 (Firebase Auth + Firestore + Cloud Functions)
  - 課金データ管理
  - 課金レシートの認証

これら全てで Firebase を利用しています。

個人で上記機能の実装はかなりの工数を必要としますが、それを大幅に短縮させられるのが Firebase です。

Flutter と Firebase の相性も良く、情報も多くあったのでハマりポイントは少なめでした。

### Codemagic

元々 Flutter 向けに作られた CI/CD サービスとのことです。

個人開発で CI/CD が必要かと疑問に思われるかもしれませんが、

- 常にクリーンな環境でビルドが実行される
- GitHub に push するだけでストアへバイナリアップまでしてくれる

といったメリットがあり、個人開発でも採用価値があると思います。

それに個人開発程度の規模であれば無料プランでも十分やりくりできる範囲です。

今はテストコードをほとんど書いていないのでストアアップ専用になっていますが、いずれテストコードをしっかり書いて Codemagic 上のクリーンな環境でテストするシステムも構築したいと考えています。

### Flutter + Firebase という構成

時間、人員が限られている個人開発において、iOS/Android 両プラットフォーム向けアプリをリリースするのであれば、Flutter + Firebase は間違いなく候補の 1 つになると思います。

思い描いたデザインや仕様をサクサク形にできる体験はたまりません。

## 今後のプラン

本アプリの機能は、実装したい機能のまだ一部です。アプリとして成り立つレベルに至り次第、1.0.0 として公開しました。  
しばらくは HistBet の機能拡充を目標に開発を進めていくつもりです。

並行して今回の開発で得た知見を共有し、これから Flutter/Firebase 開発を頑張る人の役に立てればなと思います。
