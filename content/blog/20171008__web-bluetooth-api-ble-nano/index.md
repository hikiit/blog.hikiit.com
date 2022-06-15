---
title: "Web Bluetooth API + BLE Nanoでブラウザから通信する"
date: "2017-10-08T19:00:00+09:00"
tags: ["Web"]
---

ブラウザから Bluetooth(BLE)が使えるで話題の Web Bluetooth API が少し前に正式リリースされました。  
まだ発展途上感がありますが、今後に期待ができますね。

[Web Bluetooth](https://webbluetoothcg.github.io/web-bluetooth/)

せっかく手元に BLE Nano があるので、今回は BLE Nano とブラウザを Bluetooth で通信してみます。

## Web Bluetooth API

まず Web Bluetooth API について簡単に説明します。

先述したように Web から BLE 通信できる代物で、わざわざネイティブアプリを入れなくても Web アプリで簡単に BLE 通信を可能にするものです。

端末が対応していれば準備オッケーです。

対応ブラウザは以下から確認可能です。  
[GitHub WebBluetoothCG/web-bluetooth](https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md)

その他いろいろ制限(SSL が必須であるとか)があるみたいですが、とりあえず割愛します。

### 作るもの

今回はブラウザから BLE Nano にメッセージを送信し、その後は逆に BLE Nano からメッセージを取得します。

ボトルメッセージ的な物をイメージしていただけたらなと。

### BLE Nano 側の実装

BLE Nano のサンプルコードの Simple Chat を元に改変します。

場所は`スケッチの例` → `Examples for BLE Nano`→ `BLE_Examples` → `Simple Chat`です。

そのままだと BLE Nano から読み込みができないので、必要なタイミングで read 用キャラクタリスティックをアップデートさせます。

```c
ble.updateCharacteristicValue(characteristic2.getValueAttribute().getHandle(), rx_buf, rx_buf_num);
```

全体は GitHub を参照してください。  
[https://github.com/hiknot/rw_blenano](https://github.com/hiknot/rw_blenano)[github.com](https://github.com/hiknot/rw_blenano)

### ブラウザ側の実装(html + javascript)

通信では GATT（Generic Attribute Profile）を使用します。

GATT とは BLE 通信を行う際の共通の形式です。これによってメーカに関わらず通信を可能にします。

今回の通信で重要なのは UUID と Value です。UUID を指定することでで BLE Nano のサービスとデータ(Value)を扱うことができます。

開発には Cloud9 を利用しました。

Cloud9 でコード書いてファイルを public にすれば、自動的に ssl 通信の環境になるので楽です。

全体は GitHub を参照してください。  
[https://github.com/hiknot/rw_message](https://github.com/hiknot/rw_message)[github.com](https://github.com/hiknot/rw_message)

#### requestDevice

本来であればすでに定義されているサービスを指定して検索をかけますが、今回のメッセージ保存に合致する BLE のサービスが見つからなかったので、`acceptAllDevices`で周りの BLE を全て検索します。

それだけだと繋がらないので、`optionalServices`で UUID も指定します。(セキュリティ的な問題?)

UUID は BLE Nano の実装時に定義した物を利用します。

```javascript
navigator.bluetooth.requestDevice({
  optionalServices: [SERVICE_UUID],
  acceptAllDevices: true,
})
```

#### 接続

```javascript
    .then(device => {
      console.log("devicename:" + device.name);
      console.log("id:" + device.id);

      return device.gatt.connect();
    })
```

#### サービスの取得

```javascript
    .then(server => {
      console.log("success:connect to device");

      return server.getPrimaryService(SERVICE_UUID);
    })
```

#### キャラクタリスティックを取得します。

こちらの UUID も BLE Nano 実装時の物を利用します。

RX が BLE Nano からの読み込みに使う UUID で、TX は BLE Nano への書き込みに使用します。

```javascript
    .then(service => {
      console.log("success:service");

      // 複数のキャラクタリスティックを配列で取得可能
      return Promise.all([
        service.getCharacteristic(RX_CHARACTERISTIC_UUID),
        service.getCharacteristic(TX_CHARACTERISTIC_UUID)
      ]);
    })
```

使用するキャラクタリスティックが 1 つであれば、以下のようで問題ありません。

```javascript
service.getCharacteristic(CHARACTERISTIC_UUID)
```

#### データ書き込み

`writeValue()`でデータの書き込みです。

文字列を UTF-8 形式で送信しています。

変換には[text-encoding](https://github.com/inexorabletash/text-encoding)を使用しました。

```javascript
var form_d = document.getElementById("data-form").value

var ary_u8 = new Uint8Array(new TextEncoder("utf-8").encode(form_d))
console.log(ary_u8)
try {
  txCharacteristic.writeValue(ary_u8)
} catch (e) {
  console.log(e)
}
```

#### データ読み込み

`readValue()`でキャラクタリスティックからデータ読み込みです。

取得した value を Arraybuffer 形式にして、UTF-8 形式でデコードしています。

```javascript
let message

try {
  rxCharacteristic.readValue().then(value => {
    message = value.buffer
    console.log(new Uint8Array(message))
    document.getElementById("data-form").value = new TextDecoder(
      "utf-8"
    ).decode(message)
  })
} catch (e) {
  console.log(e)
}
```

### 動作

MacBook+Chrome と Android+Chrome では動くのを確認しました。

こんな感じに動きます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">WebBluetoothAPIとBLE Nanoでボトルメッセージ的な通信 <a href="https://twitter.com/hashtag/WebBluetooth?src=hash&amp;ref_src=twsrc%5Etfw">#WebBluetooth</a> <a href="https://twitter.com/hashtag/BLENano?src=hash&amp;ref_src=twsrc%5Etfw">#BLENano</a> <a href="https://t.co/rDelL9n34x">pic.twitter.com/rDelL9n34x</a></p>&mdash; hiknot (@hiknot18) <a href="https://twitter.com/hiknot18/status/916957795835977728?ref_src=twsrc%5Etfw">October 8, 2017</a></blockquote>

## 可能性

Web コンテンツの可能性が増えたってことですよね。

以前までだと Bluetooth を経由する場合アプリを入れることが必須でしたが、そもそもアプリを入れること自体にハードルがありました。

しかし今回、簡易的な通信であれば Web で終わらせることが可能になったので、ハードルが下がって利便性もあがるんじゃないかなーと思います。

IoT デバイスからデータを引っ張ってくるだけなら WebBluetooth で十分かもしれませんね。

### 参考

[https://ics.media/entry/15520](https://ics.media/entry/15520)

[http://yegang.hatenablog.com/entry/2014/08/09/195246](http://yegang.hatenablog.com/entry/2014/08/09/195246)
