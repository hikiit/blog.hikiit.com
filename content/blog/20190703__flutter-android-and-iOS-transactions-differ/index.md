---
title: "Flutter AndroidとiOSでFirestoreトランザクションの挙動が異なる"
date: "2019-07-03T00:12:02+09:00"
tags: ["Flutter"]
---

Flutter で Firestore トランザクションを試していた時にハマった話です。

## 現象

**Android と iOS で Firestore トランザクションの挙動が異なる**

- Android : トランザクションに失敗しているのに成功として処理される
- Android : トランザクション中で throw するとエラーをキャッチできない

### 環境

```
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^0.4.0
  cloud_firestore: ^0.12.5+2
```

```
[✓] Flutter (Channel stable, v1.5.4-hotfix.2, on Mac OS X 10.14.5 18F132, locale ja-JP)

[✓] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
[✓] iOS toolchain - develop for iOS devices (Xcode 10.2.1)
[✓] Android Studio (version 3.4)
[!] VS Code (version 1.35.0)
    ✗ Flutter extension not installed; install from
      https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[✓] Connected device (2 available)
```

### トランザクション失敗例

book1 を read して得たタイトル book2 のタイトルに update で反映させようとしています。  
しかしながら、book1 の read 後に book1 に対して何も write していないのでトランザクションは失敗します。

```dart
final CollectionReference booksRef = _db.collection('/books');

await _db.runTransaction((Transaction tx) async {
  print('Transaction start');
  DocumentSnapshot book1Snapshot = await tx.get(booksRef.document('book1'));

  if (book1Snapshot.exists) {
    await tx.update(booksRef.document('book2'),
        <String, dynamic>{'title': book1Snapshot.data['title']});
  }
}).then((value) {
  print('ok');
}).catchError((err) {
  print(err);
});
```

#### iOS 上で実行した結果

複数回トランザクションが失敗した後、エラーが出力しました。

```
flutter: Transaction start
flutter: Transaction start
flutter: Transaction start
flutter: Transaction start
flutter: Transaction start
flutter: Transaction start
flutter: PlatformException(9, Transaction failed all retries.: Every document read in a transaction must also be written in that transaction., null)
```

#### Android 上で実行した結果

2 回トランザクション試行後、成功と出力しました。

```
I/flutter (11258): Transaction start
I/flutter (11258): Transaction start
I/flutter (11258): ok
```

### エラーを throw した例

トランザクション中に throw します。  
エラー発生時はトランザクションが失敗します。

```dart
await _db.runTransaction((Transaction tx) async {
  print('Transaction start');
  throw 'err';
}).then((value) {
  print('ok');
}).catchError((err) {
  print(err);
});
}
```

#### iOS 上で実行した結果

エラーをキャッチして終了します。

```
flutter: Transaction start
flutter: PlatformException(error, err, null)
```

#### Android 上で実行した結果

アプリが落ちます。

一応エラーログをすべて貼り付けます。

```
I/flutter (11258): Transaction start
E/CloudFirestorePlugin(11258): java.lang.Exception: Do transaction failed.
E/CloudFirestorePlugin(11258): java.util.concurrent.ExecutionException: java.lang.Exception: Do transaction failed.
E/CloudFirestorePlugin(11258): 	at com.google.android.gms.tasks.Tasks.zzb(Unknown Source:61)
E/CloudFirestorePlugin(11258): 	at com.google.android.gms.tasks.Tasks.await(Unknown Source:33)
E/CloudFirestorePlugin(11258): 	at io.flutter.plugins.firebase.cloudfirestore.CloudFirestorePlugin$4.apply(CloudFirestorePlugin.java:409)
E/CloudFirestorePlugin(11258): 	at io.flutter.plugins.firebase.cloudfirestore.CloudFirestorePlugin$4.apply(CloudFirestorePlugin.java:361)
E/CloudFirestorePlugin(11258): 	at com.google.firebase.firestore.FirebaseFirestore.lambda$runTransaction$1(com.google.firebase:firebase-firestore@@19.0.0:283)
E/CloudFirestorePlugin(11258): 	at com.google.firebase.firestore.FirebaseFirestore$$Lambda$3.call(Unknown Source:6)
E/CloudFirestorePlugin(11258): 	at com.google.android.gms.tasks.zzv.run(Unknown Source:2)
E/CloudFirestorePlugin(11258): 	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1162)
E/CloudFirestorePlugin(11258): 	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:636)
E/CloudFirestorePlugin(11258): 	at java.lang.Thread.run(Thread.java:764)
E/CloudFirestorePlugin(11258): Caused by: java.lang.Exception: Do transaction failed.
E/CloudFirestorePlugin(11258): 	at io.flutter.plugins.firebase.cloudfirestore.CloudFirestorePlugin$4$1$1.error(CloudFirestorePlugin.java:391)
E/CloudFirestorePlugin(11258): 	at io.flutter.plugin.common.MethodChannel$IncomingResultHandler.reply(MethodChannel.java:181)
E/CloudFirestorePlugin(11258): 	at io.flutter.embedding.engine.dart.DartMessenger.handlePlatformMessageResponse(DartMessenger.java:103)
E/CloudFirestorePlugin(11258): 	at io.flutter.embedding.engine.FlutterJNI.handlePlatformMessageResponse(FlutterJNI.java:228)
E/CloudFirestorePlugin(11258): 	at android.os.MessageQueue.nativePollOnce(Native Method)
E/CloudFirestorePlugin(11258): 	at android.os.MessageQueue.next(MessageQueue.java:325)
E/CloudFirestorePlugin(11258): 	at android.os.Looper.loop(Looper.java:142)
E/CloudFirestorePlugin(11258): 	at android.app.ActivityThread.main(ActivityThread.java:6494)
E/CloudFirestorePlugin(11258): 	at java.lang.reflect.Method.invoke(Native Method)
E/CloudFirestorePlugin(11258): 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
E/CloudFirestorePlugin(11258): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)
I/flutter (11258): PlatformException(Error performing transaction, java.lang.Exception: Do transaction failed., null)
D/AndroidRuntime(11258): Shutting down VM
E/AndroidRuntime(11258): FATAL EXCEPTION: main
E/AndroidRuntime(11258): Process: com.example.flutter_firestore, PID: 11258
E/AndroidRuntime(11258): java.lang.IllegalStateException: Reply already submitted
E/AndroidRuntime(11258): 	at io.flutter.embedding.engine.dart.DartMessenger$Reply.reply(DartMessenger.java:124)
E/AndroidRuntime(11258): 	at io.flutter.plugin.common.MethodChannel$IncomingMethodCallHandler$1.success(MethodChannel.java:204)
E/AndroidRuntime(11258): 	at io.flutter.plugins.firebase.cloudfirestore.CloudFirestorePlugin$3.onComplete(CloudFirestorePlugin.java:425)
E/AndroidRuntime(11258): 	at com.google.android.gms.tasks.zzj.run(Unknown Source:4)
E/AndroidRuntime(11258): 	at android.os.Handler.handleCallback(Handler.java:790)
E/AndroidRuntime(11258): 	at android.os.Handler.dispatchMessage(Handler.java:99)
E/AndroidRuntime(11258): 	at android.os.Looper.loop(Looper.java:164)
E/AndroidRuntime(11258): 	at android.app.ActivityThread.main(ActivityThread.java:6494)
E/AndroidRuntime(11258): 	at java.lang.reflect.Method.invoke(Native Method)
E/AndroidRuntime(11258): 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
E/AndroidRuntime(11258): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)
```

## 解決策

これを見る限り、Flutter for Android か cloud_firestore のバグかなと思っています。修正待ちですかね。  
GitHub の Issue に似たのがなければ Issue 投げます。

私はずっと Android の実機デバッグしか使っていませんでしたので、原因が分かるまで相当な時間を無駄にしました。
