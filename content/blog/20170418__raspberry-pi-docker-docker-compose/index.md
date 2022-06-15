---
title: "Raspberry PiにDockerとdocker-composeを入れる"
date: "2017-04-18T21:22:08+09:00"
tags: ["Raspberry Pi"]
---

## Docker

今までは CPU の違いから導入できなかったみたいですが、現在では公式にサポートされているようです。

また、hypriot が Docker 同梱の OS(Raspbian ベース?)を用意しているので、それを利用する方法もあります。

今回は標準の Raspbian へ後から導入します。

### 導入

公式ブログが一番わかりやすいと思います。  
[www.raspberrypi.org](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

どうやらコマンド 1 つで入るようです。

```
$curl -sSL https://get.docker.com | sh
```

以下を打つと非 root 状態でも利用できるようになります。  
再ログインが必要です。

```
$sudo usermod -aG docker [username]
```

ラズパイの CPU は ARM なので、ほとんどの docker は動きません。

### テスト

とりあえず確認として hypriot の docker を動かしてみます。

このサイトを参照させていただきました。  
[hammmm.hatenablog.com](http://hammmm.hatenablog.com/entry/2016/01/09/230036)

```
$docker run -d -p 80:80 hypriot/rpi-busybox-httpd
```

ラズパイのアドレスを PC で覗くと hypriot の画像が現れます。

```
http://192.168.xxx.xxx
```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hisurga/20170416/20170416224856.png)

確認が終わったら ps で動作状況を確認し、stop で名前を指定して停止します。

```
$docker ps
$docker stop [NAME]
```

## docker-compose

かなりハマりました。

ただネットの海は広く、先人がいらっしゃいました。  
[www.berthon.eu](https://www.berthon.eu/2017/getting-docker-compose-on-raspberry-pi-arm-the-easy-way/)

### 導入

では、上記サイトを参考に docker-compose を入れていきます。  
とはいっても特別に調整などは不要なので、参考にというかほとんどそのまま打てば問題ありません。

まずは docker-compose を clone してローカルへファイルを準備します。

```
$ git clone https://github.com/docker/compose.git
```

続いて ARM へ対応するように Dockerfile の内容を置換していきます。

```
$ cd compose
$ cp -i Dockerfile Dockerfile.armhf
$ sed -i -e 's/^FROM debian\:/FROM armhf\/debian:/' Dockerfile.armhf
$ sed -i -e 's/x86_64/armel/g' Dockerfile.armhf
```

ビルドして走らせます。結構時間がかかります。

```
$ docker build -t docker-compose:armhf -f Dockerfile.armhf .
$ docker run --rm --entrypoint="script/build/linux-entrypoint" -v $(pwd)/dist:/code/dist -v $(pwd)/.git:/code/.git "docker-compose:armhf"
```

dist 以下ファイルを bin へ移動させ、コマンドで起動できるようにします。

```
$ ls -l dist/
$ sudo cp dist/docker-compose-Linux-armv7l /usr/local/bin/docker-compose
$ sudo chown root:root /usr/local/bin/docker-compose
$ sudo chmod 0755 /usr/local/bin/docker-compose
```

終了後、以下のようになれば成功です。

```
$ docker-compose version
docker-compose version 1.13.0dev, build ae2cc6b
docker-py version: 2.2.1
CPython version: 2.7.13
OpenSSL version: OpenSSL 1.0.1t  3 May 2016
```
