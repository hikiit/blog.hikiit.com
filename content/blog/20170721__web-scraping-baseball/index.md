---
title: "Webスクレイピングして野球の試合情報を取得する"
date: "2017-07-21T00:00:00+09:00"
tags: ["Python"]
---

とにかくベイスターズを応援したいので、Web スクレイピングで試合内容を取得してみます。

## 実装

`python3`で`lxml`と`requests`を利用しました。

詳細はコメントアウトしてあるので、特筆することはないです。

スクレイピングは迷惑かけない程度に！

```python
#-*- coding: utf-8 -*-
import lxml.html
import requests
from datetime import datetime
from time import sleep

DENA = "ＤｅＮＡ"

# 日付情報から某サイトのURLを取得
today = datetime.now()
topUrl = "https://xxx.jp/npb/schedule/?date={today:%Y%m%d}"

# html及びroot取得
topHtml = requests.get(topUrl).text
topRoot = lxml.html.fromstring(topHtml)

# 週間予定からtoday pl7で今日の試合予定パスを取り、そこからDENAの文字列を検索
tdTeam = topRoot.xpath('//td[@class="today pl7"]/*[text()="%s"]' %DENA)

if tdTeam == []:
    print("今日は試合がないようです。")
    exit()

# scoreUrlを探すために一旦trまで下がる
tr = tdTeam[0].getparent().getparent()

# scoreUrlの場所はtoday ctの2番目
forScoreUrl = tr.xpath('td[@class="today ct"][2]//a/@href')

if forScoreUrl == []:
    print("今日は試合がまだのようです。")
    exit()

scoreUrl = "http://xxx.jp/live/" + forScoreUrl[0] + "score";
scoreHtml = requests.get(scoreUrl).text
scoreRoot = lxml.html.fromstring(scoreHtml)

# liveNaviの場所に{攻撃中のチーム or 試合終了}が表示
liveNavi = scoreRoot.cssselect('#livenavi p')[0].text_content()

# 試合中であった場合、batterspanから背番号取得
if DENA in liveNavi:
    print(f"{scoreRoot.cssselect('#batter span')[0].text_content()}が打席に立ってます。応援しましょう。")
elif "試合終了" in liveNavi:
    print("試合は終了しました。")
else:
    print("相手の攻撃中です。")
```

### どうなった

これで「試合の開催状況」「自チーム攻撃の時は打席に立つ選手の背番号」を取得することができるようになりました。

手探り状態だったので、非効率なコーディングだと思います。

## 参考にさせていただいたサイト

[http://qiita.com/beatinaniwa/items/72b777e23ef2390e13f8](http://qiita.com/beatinaniwa/items/72b777e23ef2390e13f8)
