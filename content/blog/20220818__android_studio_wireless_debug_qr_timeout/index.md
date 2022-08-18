---
title: "Android Studio ワイヤレスデバッグのQRコードペア設定に失敗するときの対策"
date: "2022-08-18T00:00:00+00:00"
tags: ["Android Studio"]
---

## 現象

1. Android Studio -> ワイヤレスデバッグ で QR コードを表示する
2. Android 端末 -> 開発者向けオプション -> ワイヤレスデバッグ -> QR コードによるペア設定 で QR コードを読み取る
3. Android 端末側のペア設定デバイスに PC が追加される
4. Android Studio 上の表示は読み込み中のまま
5. 2 分くらい経過後、Android Studio 上に失敗と表示される

### 環境

```
Android Studio Chipmunk | 2021.2.1 Patch 1
Build #AI-212.5712.43.2112.8609683, built on May 19, 2022
```

## 対策

Andoroid Studio を再起動する
