---
title: "ブログをGatsby.js + Gatsby Cloudに移行した理由と手順"
date: "2022-06-20T00:00:00+00:00"
tags: ["Gatsby"]
---

- プラットフォーム： **はてなブログ** -> **Gatsby.js + Gatsby Cloud**
- ドメイン： `https://hiknot.hatenablog.com/` -> `https://hiknot.net`
- コスト： **月 1000 円** -> **年間 1600 円**

## ありがとうはてな、こんにちは Gatsby

みんなが一度は悩む問題 **「エンジニアブログ どこにするか」** についてですが、私は Gatsby.js + Gatsby Cloud で落ち着きました。

まず私がブログを選ぶ上で重視しているのは下記です。

- Markdown で書ける (必須)
- シンタックスハイライトが使える (必須)
- 広告がない、あるいは少ない
- エクスポート機能などで記事を避難できる
- 管理が楽 (例えばレンタルサーバー借りて WordPress は勘弁)
- 雑記も投稿できる
- できれば安い

それらを満たした上で、今まで気に入って利用していたのが **はてなブログ** です。  
ただし、はてなブログの無料会員は広告が少し多めで、加えて文章内のキーワードに自動的にリンクを付与されてしまうので有料会員で利用していました。  
しばらくはそれで満足していたのですが、自分の更新頻度/アクセス数と会費を照らし合わせると、会費に見合っていないように感じてしまったので移行を決意しました。(月単位だと 1000 円 / 年単位で買うと割引)  
※はてなブログ Pro 自体はとてもいいサービスだと思います！

上記必須項目を満たしている候補としては **note** / **Zenn** が挙げられます。  
Zenn はすでに利用していて気に入ってもいるので Zenn に統一することも考えたのですが、技術情報共有サイトに全く関係ない雑記を投稿するのも憚れるのでやめました。note も悪くはなかったのですが、Markdown で書く際に若干違和感があったのでやめました。

そんなときに見つけたのが Gatsby によるブログ作成と Gatsby Cloud によるビルド/ホスティングです。

### Gatsby.js + Gatsby Cloud は安い

無料会員では Gatsby Cloud によるビルド/ホスティングが制限されますが、個人レベルでは全く問題になりません。

- ビルド回数 500 回/月
- 帯域制限 100GB/月
- リクエスト数 100 万回/月

つまり、無料で十分なんです。  
私はせっかくなので独自ドメインを取得しましたが、それでも **年間** 1600 円です。

### Gatsby.js + Gatsby Cloud は速い

ビルドごとに Static なページを作成し、CDN で配信するので早いです。  
なお、Gatsby Cloud の CDN には日本リージョンがないようですが、収益を目的としない個人ブログなのでそれほど気にしていません。気にする方は Firebase Hosting などを利用するといいと思います。

### Gatsby.js + Gatsby Cloud は安心

GitHub で Markdown ファイルを管理して Gatsby Cloud からリポジトリ連携して配信するので、記事を自分で管理していることによる安心感があります。

## Gatsby.js + Gatsby Cloud にするためにやったこと

公開リポジトリで運営しているので変更内容は全て下記にあります。  
https://github.com/hiknot/hiknot.net

### gatsby-starter-blog

[96972a](https://github.com/hiknot/hiknot.net/commit/96972a54f2df13fa17f1010ccf8e7567b72ba07e)

Gatsby 公式にスターターがあるのでそれを利用します。  
https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog

### ブログ名やプロフィール画像などの変更

[ed3fb7](https://github.com/hiknot/hiknot.net/commit/ed3fb74a1871cabc0c2ceede99441debb75e092a) /
[1b01a5](https://github.com/hiknot/hiknot.net/commit/1b01a51ca4972815df99a25c28802c4a44ce5155) /
[99cabd](https://github.com/hiknot/hiknot.net/commit/99cabd58b5fa38018a10e112e93d129cef927c63) /
[277a93](https://github.com/hiknot/hiknot.net/commit/277a931df793c27c4fa01302201a889e78e5dcb0)

サンプルのままにはしておけないので変更します。

### Twitter 埋め込み用 Plugin の追加

[8d3bee](https://github.com/hiknot/hiknot.net/commit/8d3beedb93eeb4b5051ca7ad119ae590c7810e7b)

`gatsby-plugin-twitter` を利用して Twitter 埋め込みを可能にします。  
https://www.gatsbyjs.com/plugins/gatsby-plugin-twitter/

埋め込む際は Twitter 公式のツイート埋め込みのコードを貼り付け、末尾の`<script>...</script>`を削除します。

### gist 埋め込み用 Plugin の追加

[d14809](https://github.com/hiknot/hiknot.net/commit/d14809cb339fa97108cfca401fe96c47d5dc9ee9)

`gatsby-remark-embed-gist` を利用して gist の埋め込みを可能にします。  
https://www.gatsbyjs.com/plugins/gatsby-remark-embed-gist/

### slug の変更

[ad66bc](https://github.com/hiknot/hiknot.net/commit/ad66bc041da9e6a734565571731c3292e6bc4cc6)

記事ごとの URL を変更します。ここは好みですね。

管理しやすいようにフォルダ名は `YYYYMMDD__foobar`とし、ビルド時に`__`から左を削除しています。  
また、デフォルトではドメイン直下に記事が配置されますが、私はそこに`entry`を挟んでいます。

### ページ幅の変更

[00ece2](https://github.com/hiknot/hiknot.net/commit/00ece24c255b1ac88988c6210dc255fe7dd7b866)

コードを書くには少し幅が狭いので変更します。

### Google Analytics の導入

[1a2feb](https://github.com/hiknot/hiknot.net/commit/1a2feb95078e1d288ef578026d1830cda54192fc)

いずれ必要になると思うので導入します。

### フォントの変更

[06c656](https://github.com/hiknot/hiknot.net/commit/06c65647efea215cfb58d51c750dc3881a263066) /
[b0c36e](https://github.com/hiknot/hiknot.net/commit/b0c36eb89fda9d19672bcb65a9c3d575d0446587)

typography を用いて Google Fonts を利用したり、フォントサイズを変更してブログの見た目を整えました。

### はてなブログからの引越し

はてなブログは Markdown で書いていましたが、エクスポート機能を利用すると MovableType と呼ばれる形式に変換されてしまいます。  
MT 形式を Markdown することも可能ですが、記事数もそんなに多くなかったので手動でコピーしました。

## 今後

結果として、現在の投稿先は **本ブログ** / **Zenn** / **Qiita** の 3 つになりました。

**本ブログ**では技術情報、雑記関係なく投稿していくことになります。**Zenn** には技術情報だけを投稿していくことになります。  
技術情報を投稿する際の **本ブログ** と **Zenn** の使い分けは定義していませんが、本ブログにはイイネやコメントがないので、何かしらのフィードバックを期待する場合は **Zenn** に書くと思います。

**Qiita** は現状ほぼ休止中ですが、たまに記事投稿キャンペーンをやったりするのでその時に投稿するかもしれません。

Gatsby.js はカスタマイズ可能な範囲が広いですが、まだそのカスタマイズ性を活かしきれていません。
現状では今までできていたことができなくなっていたりもするので、今後はより読みやすくなるようにカスタマイズしていきたいと思います。
