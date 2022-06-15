---
title: "Flutter cloud_firestoreプラグインを入れると64kエラーになる時の解決策"
date: "2019-06-23T23:29:23+09:00"
tags: ["Flutter"]
---

cloud_firestore を試そうとサンプルを実行していたところ、以下の問題にぶつかりました。

## 現象

cloud_firestore プラグイン導入後、ビルドが通りませんでした。

### 環境

- Flutter/Android
- firebase_core: ^0.4.0
- cloud_firestore: ^0.12.5+2

### エラーメッセージ

```
D8: Cannot fit requested classes in a single dex file (# methods: 74144 > 65536)

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:transformDexArchiveWithExternalLibsDexMergerForDebug'.
> com.android.builder.dexing.DexArchiveMergerException: Error while merging dex archives:

/省略/

  The number of method references in a .dex file cannot exceed 64K.
  Learn how to resolve this issue at https://developer.android.com/tools/building/multidex.html

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 3s
Finished with error: Gradle task assembleDebug failed with exit code 1
```

## 解決策

**minSdkVersion を 21 にする**

これから作るアプリということで、21 未満は切りました。  
(私の環境では`multiDexEnabled true`の設定は不要でした)

もし 21 未満の対応も必要な場合、下記サイトが参考になると思います。  
[https://minpro.net/android-64k-problems](https://minpro.net/android-64k-problems)
