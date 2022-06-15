---
title: "Raspberry Piにssh接続する"
date: "2017-04-16T20:05:55+09:00"
tags: ["Raspberry Pi"]
---

外部の PC などから編集できるように ssh 設定を行います。

## 固定 IP アドレスの設定

root に切り替えます。

```
sudo su -
```

以下ファイルを編集します。

```
/etc/dhcpcd.conf
```

最下部へ以下のように追記します。  
設定はご自身のルータ設定によって変えてください。

static ip_address:ラズパイに設定したいアドレス  
static routers:ルータのアドレス  
static domain_name_servers:DNS サーバのアドレス

```
interface eth0
static ip_address=192.168.10.10/24
static routers=192.168.10.1
static domain_name_servers=192.168.10.1
```

再起動します。

```
reboot
```

以下コマンドで inet に書かれたアドレスが設定したアドレスになっているか確認します。

```
ifconfig
```

他の PC から ping を撃ってもいいですね。

## ssh の有効化

この状態で ssh を試みましたが、うまくいきませんでした。  
どうやら最近では初期状態で ssh が無効化されている？ らしいので ssh ファイルを作成します。

```
touch /boot/ssh
```

すでに作成されているのに ssh できない場合は他がおかしいと思います。

ラズパイを再起動してから mac のターミナルで ssh を試みます。

```
ssh [ユーザ名]@xxx.xxx.xxx.xxx
```

出てくる警告は `yes` で問題ありません。

## 完了

ログインできたら成功です。

あとはリモートで作業できますので、hdmi やキーボードは外しても大丈夫です。
