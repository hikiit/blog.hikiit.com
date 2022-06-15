---
title: "Flutter URL指定で画像を表示する"
date: "2019-06-19T02:00:05+09:00"
tags: ["Flutter"]
---

Flutter アプリでインターネット上の画像を表示する方法です。

## 画像の表示

インターネットから取ってきた画像を表示するシチュエーションはよくありますが、URL 指定で簡単に対応することができます。

### URL の指定

`Image.network`で URL 指定するだけです。

```dart
Image.network(
            'https://cdn-ak.f.st-hatena.com/images/fotolife/h/hisurga/20190616/20190616231036.png'),
```

## コード全体

```dart
import 'package:flutter/material.dart';

class MyImagePage extends StatefulWidget {
  MyImagePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyImagePageState createState() => _MyImagePageState();
}

class _MyImagePageState extends State<MyImagePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Image.network(
            'https://example.png'),
      ),
    );
  }
}
```

プロジェクトの全体像は GitHub に載せています。

https://github.com/hiknot/flutter-samples/tree/master/flutter_image

## 公式リファレンス

https://api.flutter.dev/flutter/widgets/Image-class.html
