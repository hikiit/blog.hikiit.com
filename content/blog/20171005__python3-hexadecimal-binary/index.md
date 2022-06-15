---
title: "Python3 16進数文字列をバイナリ形式に変換する"
date: "2017-10-05T22:21:04+09:00"
tags: ["Python"]
---

16 進数文字列のファイルをバイナリ形式ファイルで吐き出します。

バイナリデータが欲しいのに、なぜか文字列となっていたときに使いました。

```python
import math

fString = "48656c6c6f"

// 文字列を16進数に
num = int(fString, 16)

// to_bytes
// 1つめの引数はバイト数 ※1
// byteorderで最上位のバイトがバイト配列の最初になります
bytes = num.to_bytes(int(len(fString)/2), byteorder='big')
```

※110 バイトでやると  
000000000048656c6c6f  
6 バイトだと  
0048656c6c6f

python3.2 以降みたいです。  
[https://docs.python.jp/3/library/stdtypes.html](https://docs.python.jp/3/library/stdtypes.html)
