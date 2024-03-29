---
title: "Flutterで競馬収支管理アプリを作成しました"
date: "2020-11-19T22:47:17+09:00"
tags: ["Flutter"]
---

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">iOS/Androidアプリ「HistBet」をリリースしました🎉<br><br>競馬の収支を &quot;見やすく&quot; 管理できます！<br><br>月間成績やグラフで振り返ることもできるので、競馬が好きな方はぜひともインストールしてみてください✨<a href="https://t.co/2BvXRWdVD5">https://t.co/2BvXRWdVD5</a><a href="https://t.co/OIuFtrmSC4">https://t.co/OIuFtrmSC4</a> <a href="https://t.co/ziD0KIYhEv">pic.twitter.com/ziD0KIYhEv</a></p>&mdash; hikiit (@hikiit18) <a href="https://twitter.com/hikiit18/status/1325766347100282880?ref_src=twsrc%5Etfw">November 9, 2020</a></blockquote>

個人開発として終業後と土日を利用してコツコツ実装していたモバイルアプリですが、ようやく公開することができました。  
アプリの目的からして対象ユーザーは限られますが、もし競馬が趣味であればぜひとも試していただきたいです。

さて、初版リリースを達成したところで、HistBet を作成するまでに利用した技術やサービスを共有したいと思います。

## 作成するに至った経緯

私は趣味で競馬(主にネット投票)を楽しんでいるのですが、結局自分がいくら勝っているのか、あるいは負けているのかを把握していませんでした。

自分のリターンを把握していない賭け事ほど愚かなものはありません。そこでマネーフォワードのようにアプリで収支を管理できたら便利だと考えて探してみたのですが、残念ながら自分の納得いくアプリが見つかりませんでした。

そこで「ないなら自分で作ればいい」「自分が納得するアプリを作ればいい」と考え、本アプリの制作に至りました。

## 使った技術やサービス

- Flutter
- Firebase
  - Firestore
  - Cloud Functions for Firebase
- Codemagic + GitHub

### Flutter

HistBet は iOS/Android 両プラットフォーム向けにリリースしていますが、それを可能にしたのは Flutter のおかげです。多少の分岐はありますが、9 割以上を共通のコードで作成できています。

アーキテクチャーとしては Provider を採用しました。  
シンプルに書けそうですし、ある程度規模が大きくなっても問題ない手法と考えての採用です。とはいえ Flutter は進化が早いので、この設計に固執せずにいたいとは思います。

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

これら全てで Firebase を利用しています。個人で上記機能の実装はかなりの工数を必要としますが、それを大幅に短縮させられるのが Firebase です。  
Flutter と Firebase の相性も良く、情報も多くあったのでハマりポイントは少なめでした。

時間、人員が限られている個人開発において、iOS/Android 両プラットフォーム向けアプリをリリースするのであれば、Flutter + Firebase は間違いなく候補の 1 つになると思います。

### Codemagic

元々 Flutter 向けに作られた CI/CD サービスとのことです。個人開発で CI/CD が必要かと疑問に思われるかもしれませんが、下記のようなメリットがあるので個人開発でも採用価値があると思います。

- 常にクリーンな環境でビルドが実行される
- GitHub に push するだけでストアへバイナリアップまでしてくれる

個人開発程度の規模であれば無料プランでも十分やりくりできる範囲です。  
恥ずかしながらこのアプリではテストコードをほとんど書いていませんが、いずれテストコードをしっかり書いて Codemagic 上のクリーンな環境でテストするシステムも構築したいと考えています。

## 今後のプラン

本アプリの機能は、実装したい機能のまだ一部です。アプリとして成り立つレベルに至り次第、1.0.0 として公開しました。  
しばらくは HistBet の機能拡充を目標に開発を進めていくつもりです。

並行して今回の開発で得た知見を共有し、これから Flutter/Firebase 開発を頑張る人の役に立てればなと思います。
