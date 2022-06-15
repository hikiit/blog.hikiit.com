---
title: "EC2インスタンスとローカルでファイルをやり取りする方法"
date: "2019-04-29T22:33:15+09:00"
tags: ["Linux"]
---

AWS インスタンスへ`scp`コマンドを利用してファイルを受け渡しします。

ec2 のアドレスはインスタンス管理画面から"接続"を選択すれば確認できます。`ubuntu`の箇所はインスタンスの OS によって変える必要があると思います。

ファイルのダウンロード

```sh
scp -i 'pemファイル' ubuntu@ec2アドレス.リージョンcompute.amazonaws.com:/home/ubuntu/foo.file /ローカル/bar/
```

ファイルのアップロード

```
scp -i 'pemファイル' /ローカル/foo.file ubuntu@ec2アドレス.リージョン.compute.amazonaws.com:/home/ubuntu/アップロード場所
```

`-r`オプションでフォルダごと移せます。

```
scp -r -i 'pemファイル' /ローカル/foo/ ubuntu@ec2アドレス.リージョン.compute.amazonaws.com:/home/ubuntu/アップロード場所
```

scp って ssh+cp って意味なんですって。
