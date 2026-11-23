// 探検日和（Footloot）紹介ページの文面（日 / 英）。画像名は src/images/footloot/<lang>/ の
// ファイル名（拡張子なし）。有料の世界の紹介文・段の歩数・日記は、アプリのデータにある文を
// そのまま使う（森の紹介の1文だけは、データにないので、このページのために書いた）。
// 見出しを配列にすると、その切れ目でだけ折り返す（日本語の見出しが、言葉の途中で折れないように）。
// お宝の絵と名前は載せない（まだ見つけていない人の楽しみを残すため。図鑑は影絵の画面だけを使う）。
// 日本語の文では「段」と書かない（はじめて読む人に伝わりにくいため）。「行き先」と、アプリの
// 呼び名（辺境・奥地・秘境）で書く。英語は、アプリと同じ tier のままにする。

export const ja = {
  title: "探検日和（Footloot） — いつもの歩数が、宝探しになる",
  description:
    "実際に歩いた歩数で探検家が遠征に出て、お宝と日記を持ち帰る、ドット絵の放置ゲーム。歩数は端末の中だけで使い、外へは送りません。iPhone・Android 向け。",
  name: "探検日和",
  blog: "hikiit.com",
  eyebrow: "歩数で宝探し・放置RPG ｜ iPhone・Android",
  headline: ["いつもの歩数が、", "宝探しになる。"],
  lead: "行き先を選んで、あとはいつもどおり歩くだけ。あなたが歩いた分だけ探検家が進み、お宝と1本の日記を持って帰ってきます。",
  status: "App Store・Google Play で公開準備中",
  heroAlt:
    "探検日和のホーム画面。ベースキャンプに立つ探検家と「次はどこへ行こう？」の窓",
  sections: [
    {
      image: "map",
      icon: "map",
      heading: ["地図を広げて、", "行き先を決める"],
      alt: "世界選択の地図。古い地図の上に、苔むす森・封じの洞窟・砂の遺跡・霧の湖・堕ちた都が並ぶ",
      body: [
        "舞台は、ひとつの地図でつながった5つの世界。どの世界にも、辺境・奥地・秘境の3つの行き先があり、奥へ行くほどたくさん歩く代わりに、持ち帰るお宝が増えます。",
        "いちばん近い森の小径は2,000歩。いちばん遠い秘境は30,000歩で、何日もかけて歩きます。どの世界のお宝を探すかと、どれだけ歩くかは、別々に選べます。",
      ],
    },
    {
      image: "travel",
      icon: "steps",
      heading: ["出発したら、", "あとは歩くだけ"],
      alt: "遠征中のホーム画面。苔むす森の小径を歩く探検家と、1,240歩／2,000歩の進み具合",
      body: [
        "通勤でも、買い物でも、犬の散歩でも。あなたが歩いた歩数だけ、探検家が道を進みます。アプリを開いたままにしておく必要はありません。",
        "歩数は、iPhone ではヘルスケア、Android ではヘルスコネクトから読み取ります。奥地や秘境には期限つきの挑戦もあり、何日かに分けて歩く計画が要ります。",
      ],
    },
    {
      image: "back",
      icon: "chest",
      heading: ["探検家が、", "お宝と日記を持って", "帰ってくる"],
      alt: "帰還したホーム画面。「探検家が帰ってきた！」の窓と「探索結果を見る」ボタン",
      body: [
        "必要な歩数に届くと、探検家が帰ってきます。アプリを閉じている間に帰ってきたら、通知でお知らせします。",
        "持ち帰るのは、お宝と、その遠征の日記。日記は探検家の一人称で、日本語・英語それぞれ550本以上あります。読み進めるうちに、世界どうしをつなぐ物語の手がかりが、少しずつ見つかります。",
      ],
      quote: {
        label: "遠征日記より（苔むす森）",
        text: "祠へ続く石段は、どの段も厚い苔に覆われていた。踏むたびに足元がふかりと沈み、まるで階段に受け止められているようだ。ふと見ると、段の端にだけ、苔の生えていない丸い跡が点々と続いている。長い年月のあいだに、大勢の参拝者が同じ場所を踏み続けてできたのだろう。試しに自分もその跡をたどってみた。歩幅も足の大きさもぴったり合ったのが、少しだけ不思議だった。",
      },
    },
    {
      image: "book",
      icon: "book",
      heading: ["図鑑は、", "影絵から始まる"],
      alt: "図鑑の苔むす森のページ。まだ見つけていない28種のお宝が、影絵で並ぶ",
      body: [
        "お宝は全部で146種。レア度は★1から★5まで。まだ見つけていないお宝は、図鑑では影絵のままです。何が見つかるかは、歩いてのお楽しみ。",
        "出現率は、行き先ごと・お宝ごとに、すべて図鑑で確かめられます。世界のお宝をすべて見つけると、その世界を歩いた日々をまとめた記録が残ります。",
      ],
    },
    {
      image: "paywall",
      icon: "crown",
      heading: ["広告なし。", "課金は買い切りだけ"],
      alt: "封じの洞窟の購入画面。世界の絵、必要な歩数と期限の表、★4・★5の影絵、買い切りのボタン",
      body: [
        "苔むす森は、ずっと無料で遊べます。ほかの4つの世界は、世界ごとの買い切り。サブスクリプションはありません。",
        "出現率も、必要な歩数も、期限も、課金では変わりません。遠征を助けるアイテムも、歩いて見つけるものだけです。買う前に、その世界で必要な歩数と期限を、購入画面で確かめられます。",
      ],
      facts: [
        ["世界（洞窟・遺跡・湖・都）", "1つ 800円、4つのセットで 2,400円"],
        ["自動再出発", "800円。帰還したら、同じ行き先へ自動で出発し続けます"],
        ["広告", "なし"],
      ],
    },
  ],
  worlds: {
    heading: "5つの世界",
    lead: "森は無料。ほかの世界は、地図の上に鍵つきで見えていて、買い切りで開きます。",
    items: [
      {
        id: "D1",
        name: "苔むす森",
        tag: "ずっと無料",
        intro: "最初に開く世界。苔に覆われた小径の先に、祠があります。",
        steps: "2,000〜10,000歩（期限なし）",
      },
      {
        id: "D2",
        name: "封じの洞窟",
        intro: "森の奥、祠の裏手の山。しめ縄とお札で封じられた岩戸の先へ。",
        steps: "5,000〜20,000歩（秘境72時間）",
      },
      {
        id: "D3",
        name: "砂の遺跡",
        intro: "山並みの東、はるか先の砂漠。砂に沈んだ遺跡を掘り進む。",
        steps: "5,000〜30,000歩（期限なし）",
      },
      {
        id: "D4",
        name: "霧の湖",
        intro: "村から川沿いに東。一年じゅう霧の晴れない湖と、渡し守の舟。",
        steps: "5,000〜20,000歩（期限なし）",
      },
      {
        id: "D5",
        name: "堕ちた都",
        intro: "北の山並みの向こう、雲のたまる高原に横たわる、人の消えた都。",
        steps: "5,000〜30,000歩（奥地72時間・秘境96時間）",
      },
    ],
  },
  duo: {
    heading: ["iPhone Duo では、", "左右2ページに"],
    body: [
      "iPhone Duo を開くと、画面が左右のページに分かれます。左に探検家のいる景色、右に地図や行き先。図鑑なら、左に一覧、右にお宝の詳細が並びます。",
      "閉じた外側の画面でも、開いた内側の画面でも、縦長に持っても、そのまま続きから遊べます。Android の折りたたみでも、同じ置き方になります。",
    ],
    shots: [
      {
        image: "duo-home",
        alt: "iPhone Duo の内側の画面。左のページにベースキャンプと探検家、右のページに世界選択の地図",
        caption:
          "開いたとき：左にホーム、右に地図（右の端の暗い帯は、時刻などが出る所）",
      },
      {
        image: "duo-book",
        alt: "iPhone Duo の内側の画面。左のページに図鑑の一覧、右のページにお宝の詳細と出現率",
        caption: "図鑑：左に一覧、右にお宝の詳細と出現率",
      },
    ],
    thumbs: [
      {
        image: "duo-outer",
        alt: "iPhone Duo の外側の画面のホーム",
        caption: "閉じたとき（外側の画面）",
      },
      {
        image: "duo-tall",
        alt: "iPhone Duo の内側の画面を縦長に持ったときのホーム",
        caption: "開いて、縦長に持ったとき",
      },
    ],
  },
  details: {
    heading: "こまかいこと",
    facts: [
      ["歩数のデータ", "端末の中だけで使い、外へは送りません"],
      ["アカウント", "不要。遊びのデータは端末の中にだけあります"],
      ["広告", "なし。広告のための識別子も使いません"],
      [
        "利用状況",
        "アプリの使われ方と、止まったときのエラーの内容だけを送ります。歩数や、あなたを特定する情報は含みません。設定でいつでも止められます",
      ],
      [
        "ウィジェット",
        "ホーム画面に、遠征の進み具合とお宝。iPhone はロック画面にも置けます",
      ],
      [
        "アクセシビリティ",
        "主な操作は、VoiceOver・TalkBack の読み上げだけでできます。文字は、端末の設定に合わせて1.3倍まで大きくなります",
      ],
      ["バックアップ", "ファイルに書き出して、機種変更のときに読み込めます"],
      ["言語", "日本語・英語"],
      ["対応", "iPhone（iOS 18 以上）、Android 14 以上"],
    ],
  },
  notes: [
    "画面は開発中のものです。公開までに変わることがあります。",
    "iPhone、iPhone Duo、App Store、ヘルスケア、VoiceOver は Apple Inc. の商標です。Android、Google Play、ヘルスコネクト、TalkBack は Google LLC の商標です。",
  ],
}

export const en = {
  title: "Footloot — Your everyday steps become a treasure hunt",
  description:
    "A pixel-art idle game for iPhone and Android. The steps you actually walk send your explorer on expeditions that bring back treasure and a diary entry. Your step data never leaves your phone.",
  name: "Footloot",
  blog: "hikiit.com",
  eyebrow: "Step Counter Treasure Hunt | iPhone, Android",
  headline: "Your everyday steps become a treasure hunt.",
  lead: "Pick a destination, then just walk the way you always do. Your explorer travels as far as you do, and comes home with treasure and a diary entry.",
  status: "Coming to the App Store and Google Play",
  heroAlt:
    'Footloot home screen: the explorer at base camp and a window asking "Where to next?"',
  sections: [
    {
      image: "map",
      icon: "map",
      heading: "Open the map and pick a destination",
      alt: "The world map, drawn like an old chart, with the Mossy Forest, the Sealed Cavern, the Sand Ruins, the Misty Lake and the Fallen City",
      body: [
        "Five worlds share one map. Each has three tiers, and the deeper the tier, the more steps it takes and the more treasure comes back.",
        "The nearest forest path is 2,000 steps. The farthest tiers are 30,000 and take days. Which world to search and how far to walk are separate choices.",
      ],
    },
    {
      image: "travel",
      icon: "steps",
      heading: "Set out, then just walk",
      alt: "Home screen during an expedition: the explorer on the Mossy Forest Path, with progress at 1,240 of 2,000 steps",
      body: [
        "The commute, the shopping, the dog walk. Your explorer moves exactly as many steps as you do. There is no need to keep the app open.",
        "Steps are read from the Health app on iPhone and from Health Connect on Android. Some deeper tiers have a time limit, so they take a little planning across several days.",
      ],
    },
    {
      image: "back",
      icon: "chest",
      heading: "Your explorer comes home with treasure and a diary",
      alt: 'Home screen after the return: a window saying "Your explorer is back!" and a button to see what was found',
      body: [
        "When you reach the steps a tier asks for, your explorer returns. If that happens while the app is closed, you get a notification.",
        "Each expedition brings back treasure and one diary entry, written in the explorer's own voice. There are more than 550 entries in each language. Read on and you start to find clues to a story that links the worlds.",
      ],
      quote: {
        label: "From an expedition diary (The Mossy Forest)",
        text: "Every step of the stairway up to the shrine was buried under thick moss. My feet sank softly with each stride, as if the stairs were catching me. Then I noticed a trail of bare round patches along one edge, where no moss grew at all. Over the long years, countless pilgrims must have worn them by stepping in exactly the same spots. I tried following them myself. They matched my stride and my feet perfectly, which was just a little uncanny.",
      },
    },
    {
      image: "book",
      icon: "book",
      heading: "The collection starts as silhouettes",
      alt: "The Mossy Forest page of the collection: 28 treasures not found yet, shown as silhouettes",
      body: [
        "There are 146 treasures, from ★1 to ★5. Until you find one, the collection shows only its silhouette. What turns up is for you to find out on foot.",
        "Drop rates are all there to check in the collection, for every tier and every treasure. Find every treasure in a world and the app keeps a record of the days you spent walking it.",
      ],
    },
    {
      image: "paywall",
      icon: "crown",
      heading: "No ads. One-time purchases only",
      alt: "Purchase screen for the Sealed Cavern: art of the world, a table of steps and time limits, silhouettes of its ★4 and ★5 treasures, and a one-time purchase button",
      body: [
        "The Mossy Forest is free forever. The other four worlds are one-time purchases, one world at a time. There is no subscription.",
        "Purchases never change drop rates, step requirements or time limits. The items that help an expedition cannot be bought either. You only find them by walking. Before you buy a world, its purchase screen shows the steps and time limits it asks for.",
      ],
      facts: [
        [
          "Worlds (Cavern, Ruins, Lake, City)",
          "US$5.99 each, or US$17.99 for all four",
        ],
        [
          "Auto-restart",
          "US$5.99. Your explorer sets out again for the same tier after each return",
        ],
        ["Ads", "None"],
      ],
    },
  ],
  worlds: {
    heading: "Five worlds",
    lead: "The forest is free. The other worlds are on the map from the start, locked, and each opens with a one-time purchase.",
    items: [
      {
        id: "D1",
        name: "The Mossy Forest",
        tag: "Free forever",
        intro:
          "The first world to open. A moss-covered path leads up to a shrine.",
        steps: "2,000–10,000 steps (no deadline)",
      },
      {
        id: "D2",
        name: "The Sealed Cavern",
        intro:
          "Deep in the forest, on the hill behind the shrine, stands a stone gate sealed with a sacred rope.",
        steps: "5,000–20,000 steps (Tier 3: 72h)",
      },
      {
        id: "D3",
        name: "The Sand Ruins",
        intro:
          "Far east beyond the mountains, ruins lie buried in the desert sand.",
        steps: "5,000–30,000 steps (no deadline)",
      },
      {
        id: "D4",
        name: "The Misty Lake",
        intro:
          "East along the river, a lake where the mist never lifts, and a ferryman's boat.",
        steps: "5,000–20,000 steps (no deadline)",
      },
      {
        id: "D5",
        name: "The Fallen City",
        intro:
          "Beyond the northern range, an empty city lies on a plateau where the clouds gather.",
        steps: "5,000–30,000 steps (Tier 2: 72h, Tier 3: 96h)",
      },
    ],
  },
  duo: {
    heading: "Two pages on iPhone Duo",
    body: [
      "Open an iPhone Duo and the screen splits into two pages. The scenery and your explorer sit on the left, the map or your destination on the right. In the collection, the list is on the left and the treasure's details are on the right.",
      "On the outer screen, on the inner screen, or held upright, the game carries on from where you were. Android foldables get the same layout.",
    ],
    shots: [
      {
        image: "duo-home",
        alt: "Inner screen of iPhone Duo: base camp and the explorer on the left page, the world map on the right page",
        caption:
          "Open: Home on the left, the map on the right (the dark strip at the right edge is where the time and status icons go)",
      },
      {
        image: "duo-book",
        alt: "Inner screen of iPhone Duo: the collection list on the left page, a treasure's details and drop rates on the right page",
        caption:
          "Collection: the list on the left, details and drop rates on the right",
      },
    ],
    thumbs: [
      {
        image: "duo-outer",
        alt: "Home on the outer screen of iPhone Duo",
        caption: "Closed (outer screen)",
      },
      {
        image: "duo-tall",
        alt: "Home on the inner screen of iPhone Duo, held upright",
        caption: "Open, held upright",
      },
    ],
  },
  details: {
    heading: "The details",
    facts: [
      ["Step data", "Used on your phone only. Never sent anywhere"],
      ["Account", "None. Your progress lives on your phone and nowhere else"],
      ["Ads", "None, and no advertising identifier"],
      [
        "Usage data",
        "Only how the app is used and what went wrong when it stops. No step data, and nothing that identifies you. You can turn it off in Settings at any time",
      ],
      [
        "Widgets",
        "Expedition progress and treasures on the Home Screen. On iPhone, the Lock Screen too",
      ],
      [
        "Accessibility",
        "The main actions work with VoiceOver and TalkBack alone. Text follows your device's text size, up to 1.3×",
      ],
      ["Backup", "Export a file, then import it on your new phone"],
      ["Languages", "English and Japanese"],
      ["Requires", "iPhone with iOS 18 or later, or Android 14 or later"],
    ],
  },
  notes: [
    "Screens are from a build in development and may change before release.",
    "iPhone, iPhone Duo, App Store, VoiceOver and the Health app are trademarks of Apple Inc. Android, Google Play, Health Connect and TalkBack are trademarks of Google LLC.",
  ],
}
