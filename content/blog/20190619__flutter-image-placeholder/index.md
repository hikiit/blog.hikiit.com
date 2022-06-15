---
title: "Flutter 画像ロード時にプレースホルダーを表示する"
date: "2019-06-19T00:49:05+09:00"
tags: ["Flutter"]
---

Flutter アプリで画像を表示する際にロード画面を表示する方法です。

## 画像の表示 with ロード画面

Flutter アプリで画像を表示する方法は以前のブログで紹介しましたが、  
インターネットの画像を表示する場合、少なからずダウンロードの時間が発生します。

ユーザーからすると画面にいきなり画像が表示されるので、あまりよろしくありません。

それを解決するために、画像のダウンロード中はローディングを表示(PlaceHolder)して、  
ユーザーへ「今はロード中ですよ、ちょっと待ってね」と伝えることにしましょう。

### FadeInImage を使う

FadeInImage を使えば簡単に実装することができます。

```dart
FadeInImage.assetNetwork(
  placeholder: 'images/loading.gif',
  image: 'https://foo.png',
);
```

`placeholder`には assets の画像を指定します。  
gif 画像も可能ですので、ローディング gif 画像なら「動いている感」をユーザーに与えられますね。

`image`にはダウンロード先の URL を指定します。

FadeInImage には`assetNetwork`と`memoryNetwork`の関数があり、memory の場合は`Uint8List`で指定します。

![](20190619001246.gif)

#### コード全体

```dart
import 'package:flutter/material.dart';

class MyImageFadeinPage extends StatefulWidget {
  MyImageFadeinPage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyImageFadeinPageState createState() => _MyImageFadeinPageState();
}

class _MyImageFadeinPageState extends State<MyImageFadeinPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(children: <Widget>[
        Container(
          child: FadeInImage.assetNetwork(
            height: 400,
            placeholder: 'images/loading.gif',
            image: 'https://foo.png',
          ),
        ),
        Center(
          child: Text('Bottom Text'),
        ),
      ]),
    );
  }
}
```

### CachedNetworkImage を使う

FadeInImage は便利ですが、ローディングは asset や memory で用意しなければいけません。

CachedNetworkImage なら placeholder にウィジェットを配置することができます。  
[cached_network_image | Flutter Package](https://pub.dev/packages/cached_network_image)

さらには、失敗時画面の用意もキャッシュの利用も簡単にできます。  
(あえてキャッシュを利用したくない場合のオプションは用意されていないようです)

外部プラグインですが、[公式の cookbook](https://flutter.dev/docs/cookbook/images/cached-images)でも紹介されています。

#### pubspec.yaml の編集

pubspec.yaml に`cached_network_image`を追加します。

```
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^0.1.2
  cached_network_image: "^0.4.0"
```

#### placeholder と errorWidget の配置

`placeholder`と`errorWidget`にはウィジェットを配置できるので、`CircularProgressIndicator`や Text などを配置することができます。

```dart
CachedNetworkImage(
        imageUrl: "http://foo.png",
        placeholder: CircularProgressIndicator(),
        errorWidget: Icon(Icons.error),
     ),
```

ダウンロード成功時

![](20190619003338.gif)

失敗時

![](20190619003440.gif)

#### コード全体

```dart
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class MyImageCachednetworkPage extends StatefulWidget {
  MyImageCachednetworkPage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyImageCachednetworkPageState createState() =>
      _MyImageCachednetworkPageState();
}

class _MyImageCachednetworkPageState extends State<MyImageCachednetworkPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(children: <Widget>[
        Container(
          height: 400,
          child: CachedNetworkImage(
            imageUrl: "https://foo.png",
            placeholder: Center(
              child: CircularProgressIndicator(),
            ),
            errorWidget: Center(
              child: Icon(Icons.error),
            ),
          ),
        ),
        Center(
          child: Text('Bottom Text'),
        ),
      ]),
    );
  }
}
```

プロジェクトの全体像は GitHub に載せています。  
[https://github.com/hiknot/flutter-samples/tree/master/flutter_image](https://github.com/hiknot/flutter-samples/tree/master/flutter_image)

## 参考にさせていただいたサイト

[Fade in images with a placeholder | Flutter](https://flutter.dev/docs/cookbook/images/fading-in-images)

[FadeInImage class - widgets library - Dart API](https://api.flutter.dev/flutter/widgets/FadeInImage-class.html)

[Work with cached images | Flutter](https://flutter.dev/docs/cookbook/images/cached-images)

[cached_network_image | Flutter Package](https://pub.dev/packages/cached_network_image)
