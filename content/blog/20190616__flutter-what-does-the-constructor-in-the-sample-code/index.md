---
title: "Flutter/Dart サンプルコードのコンストラクタでは何をやっているのか"
date: "2019-06-16T22:07:55+09:00"
tags: ["Flutter"]
---

Flutter の勉強を始めると下記のようなコードをよく見ると思います。  
プロジェクトを新規作成した時のサンプルコードも同じ書き方ですね。

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}
```

その中のここのコードについて

```dart
MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
```

なんとなく「StatefulWidget / StatelessWidget のサブクラスを作成する時のコンストラクタなんだな」まではわかると思いますが、Dart に慣れていないと何をやっているかわかりませんでした。

## Dart の記法

まずは Dart の書き方について調べてみます。

### 生成的コンストラクタ

一般的なものです。new で生成する時の話です。

もちろん引数を指定することができます。

```dart
class Foo {
  final String title;
  Foo(title) {
  this.title = title
  }
}
```

```dart
var foo = new Foo('piyo');
```

#### Automatic field initialization

コンストラクタで`this.フィールド名`とすれば、代入処理を書かなくても自動で代入してくれます。

下記の例では、`title` の初期化を記述しなくても自動で代入しています。

```dart
class Foo {
  final String title;
  Foo(this.title);
}
```

```dart
var foo = new Foo('piyo')
```

### 名前付き引数

関数を呼ぶときは`{}`で囲むことにより、名前付きで指定することができます。コンストラクタでも同じです。

```dart
void foo({String title, String subtitle}) {
}
foo(title: 'titleA', subtitle: 'subtitleB');
```

なお、名前付き引数は呼び出し時に必須ではありません。

```dart
void foo({String title, String subtitle}) {
}
foo(title: 'titleA'); // subtitleは省略可能
```

### Redirecting Constructors

コンストラクタの後に`:`をつけて他のコンストラクタを指定することでリダイレクトすることができます。

```dart
class Foo {
  Foo() : this.test();
  Foo.test() {
    print('test');
  }
}
```

## Flutter のコンストラクタに当てはめる

上記を元に、Flutter のサンプルアプリを確認しましょう。

```dart
// 省略
MyHomePage(title: 'Flutter Demo Home Page')
// 省略

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, String title}) {
    this.title = title;
  }
  String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}
```

引数は名前付きで指定されています。  
Automatic field initialization も利用しています。

また、`:super()`で super クラスのコンストラクタへリダイレクトしています。

Key は指定していませんが、「名前付き引数」では「全ての引数を指定すること」が必須でありません。

```dart
MyHomePage({Key key, this.title}) : super(key: key);
final String title;
```

`super()`を無視するならば、こんな感じに書き換えることもできます。  
しかしこの方法では final な値を書き換えることはできませんので注意してください。

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage(title) {
    this.title = title;
  }
  String title;
```

## What's Key?

ここで気になるのが「Key とは何か」です。

一番わかりやすいのが下記の動画です。  
[https://www.youtube.com/watch?v=kn0EOS-ZiIc](https://www.youtube.com/watch?v=kn0EOS-ZiIc)

使い所は多くはありませんが、、  
例えば TODO リストでは、優先順位を表すためにタイルウィジェットに対して順序変更、削除、追加などを行います。  
その際、古いステートを取得することを防ぐために便利です。

Key の説明は本記事の主題と少し異なるため、いずれ別記事として書くかもしれません。

今回の主題である「サンプルアプリのコンストラクタでは何をやっているか」ですが、サンプルアプリ上では Key は指定していません。(名前付き引数は省略可能)  
結果として特に何もしていないことがわかります。

## 参考にさせていただいたサイト

[Dart のコンストラクタについて | DevelopersIO](https://dev.classmethod.jp/client-side/about_dart_constructors/)

['MyhomePage({Key key, this.title}) : super(key: key);' in Flutter - what would be a clear explanation with an example? - Stack Overflow](https://stackoverflow.com/questions/52056035/flutter-myhomepagekey-key-this-title-superkey-key-pls-any-one-explain)

[When to Use Keys - Flutter Widgets 101 Ep. 4 - YouTube](https://www.youtube.com/watch?v=kn0EOS-ZiIc)

[https://doitu.info/blog/5c10f5358dbc7a001af33ce5](https://doitu.info/blog/5c10f5358dbc7a001af33ce5)
