---
title: "Xcodeがアップデートできなくなった時の解決策"
date: "2019-05-30T23:14:13+09:00"
tags: ["Xcode"]
---

Flutter へ入門しようと下記手順に従って設定していた時の話です。  
[https://flutter.dev/docs/get-started/install/macos](https://flutter.dev/docs/get-started/install/macos)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Flutter入門しようと思ったらHigh Sierraだったのでアップデートで今日の自由時間終わった。</p>&mdash; hikiit (@hikiitt) <a href="https://twitter.com/hikiitt/status/1133757326891003909?ref_src=twsrc%5Etfw">May 29, 2019</a></blockquote>

Xcode がアップデートできませんでした。

### 環境

- macOS High Sierra (詳細忘れた) -> macOS Mojave 10.14.5 へ更新
- Xcode 6.x

### 現象

私の Xcode は version6 で時が止まっていました。

iOS 開発なんてほとんどやったことがなかったので。

Flutter 開発には Xcode の最新が必要なので App Store で更新かけようと思ったのですが、、**アップデート一覧に Xcode が出てこない。**

Xcode を直接検索すると「開く」ボタンが表示されるが、押しても何も起きない。

`Launchpad` > `Xcode` には車両通行止めのマーク...  
押したら App Store が開くけど、相変わらず「開く」ボタンしかない。

### 解決策

検索しても解決策が見つからなかったのですが、  
`Launchpad` で `option` 押して `Xcode` を削除したところ、App Store で最新 Xcode をインストールできました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ふるーいXcode(v6)入れてたらAppStoreでは開くボタンになっていて、押しても反応しないしアップデートできなかった。<br>Launchpadでoption押して古いXcode消してからAppStore見たらいけた。</p>&mdash; hikiit (@hikiitt) <a href="https://twitter.com/hikiitt/status/1133766773809876992?ref_src=twsrc%5Etfw">May 29, 2019</a></blockquote>
