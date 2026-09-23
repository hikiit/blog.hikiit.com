// Fundlog 紹介ページの文面（日 / 英）。画像名は src/images/fundlog/<lang>/ の
// ファイル名（拡張子なし）。画像が無いセクションは描画されない。

export const ja = {
  title: "Fundlog — 散らばった資産を、ひとつの帳簿に",
  description:
    "株・投資信託・仮想通貨・預金の残高を自分で書き留めて、資産の推移と運用の成果を見る iPhone アプリ。データは端末の外に出ません。",
  blog: "hikiit.com",
  eyebrow: "iPhone 向け 資産推移管理アプリ",
  headline: "散らばった資産を、ひとつの帳簿に。",
  lead:
    "株も投資信託も仮想通貨も預金も。残高を自分で書き留めるだけで、全体の推移と、そのうちどこまでが入金でどこまでが運用の成果なのかが見えてきます。記録した数字は端末の外に出ません。",
  status: "App Store で公開準備中",
  heroAlt: "Fundlog のホーム画面。総資産と口座別の積み上げチャート",
  disclaimer:
    "※ Fundlog は投資助言を行うものではありません。表示される損益・リターン・各指標は、利用者が記録した数値からの計算結果です。",
  sections: [
    {
      image: "home_all",
      heading: "まとめて、ひと目で",
      alt: "口座ごとに色分けされた積み上げチャートと、今月のリターン・年初来のカード",
      body: [
        "証券会社が 2 つ、仮想通貨の取引所、外貨、銀行の預金。それぞれのアプリを開けば残高は分かっても、全部でいくらあって、去年から増えたのか減ったのかは、どこにも出てきません。",
        "Fundlog は口座ごとに色分けした積み上げで全体の推移を描きます。点線は元本。帯の高さと点線の差が、運用で増えた分です。",
      ],
    },
    {
      image: "chart",
      heading: "入金と運用益を、混ぜない",
      alt: "チャート詳細画面。基準価額の推移と期間の損益・リターン",
      body: [
        "10 万円増えたのは、入金したからか、値上がりしたからか。家計簿アプリや証券会社のアプリでは、ここが混ざってしまいます。",
        "Fundlog は入出金を残高とは別に記録し、時間加重リターンと基準価額で運用そのものの成績を出します。入金した月に成績が良く見える、といったことが起きません。",
      ],
    },
    {
      image: "input",
      heading: "記録は月に一度、数分",
      alt: "一括入力画面。全口座が縦に並び、前回の値が入った状態で専用テンキーから入力している",
      body: [
        "手入力のアプリは、入力が面倒になった時点で続かなくなります。",
        "全口座を 1 画面に並べ、前回の値を入れた状態で開きます。変わった口座だけ打ち直せばよく、専用テンキーの「次の口座」でキーボードを出し入れせずに上から順に進めます。入金があった月は、その場で入金額も添えられます。",
      ],
    },
    {
      image: "analysis",
      heading: "月ごとの成績と、リスクの指標",
      alt: "分析画面。月次リターンのヒートマップと、最大ドローダウンなどのリスク指標",
      body: [
        "月次リターンのヒートマップで、良かった月と悪かった月が並びます。最大ドローダウン、ボラティリティ、シャープレシオも、記録から計算します。",
        "指標の意味と計算方法は、カードから開ける「見方」で確かめられます。数字だけを並べて終わりにしません。",
      ],
    },
    {
      image: "passbook",
      heading: "通帳のように、さかのぼれる",
      alt: "口座の通帳画面。残高の記録と入出金が新しい順に並ぶ",
      body: [
        "口座ごとの残高と入出金を、新しい順に一列で。前回比と損益の内訳が各行に付くので、桁を間違えた記録はすぐ目につきます。間違いはその場で直せます。",
      ],
    },
    {
      image: "widgets",
      heading: "ホーム画面で確認",
      alt: "iPhone のホーム画面に置いた Fundlog のウィジェット。総資産と前回比、全期間のリターン、記録した日のグリッド",
      body: [
        "総資産と前回比、全期間のリターン、記録した日のグリッド。アプリを開かなくても分かります。金額を隠して増減率だけを出すこともできます。",
      ],
    },
    {
      image: "mask",
      heading: "資産のデータは、端末の外に出ない",
      alt: "金額を伏せた状態のホーム画面",
      body: [
        "金融機関との連携はあえて付けていません。ログイン情報を預けるのは怖い、という声をよく聞きますし、自分もそうでした。",
        "記録した金額や口座名は端末の中にだけあります。サーバーもアカウントもなく、利用状況の計測もしていません。バックアップは自分でファイルに書き出し、機種変更もそのファイルで行います。人前では、目のアイコンひとつで金額を伏せられます。",
      ],
      facts: [
        ["端末の外に出るもの", "クラッシュ情報（金額・口座名を含まない）と、App Store の課金処理だけ"],
        ["アカウント", "不要"],
        ["利用状況の計測", "なし"],
        ["バックアップ", "利用者が書き出すファイル。iCloud バックアップの対象からも外している"],
      ],
    },
  ],
}

export const en = {
  title: "Fundlog — All your assets, one ledger",
  description:
    "An iPhone app for tracking your net worth across brokerages, crypto, and bank accounts. You enter balances by hand. Nothing leaves your phone.",
  blog: "hikiit.com",
  eyebrow: "Net worth tracker for iPhone",
  headline: "All your assets, one ledger.",
  lead:
    "Stocks, funds, crypto, cash. Write down your balances and Fundlog shows how the whole picture has moved, and how much of that was money you put in versus what your investments earned. The numbers never leave your phone.",
  status: "Coming to the App Store",
  heroAlt: "Fundlog home screen with total assets and a stacked chart by account",
  disclaimer:
    "Fundlog does not provide investment advice. Gains, returns and other figures are calculated from the balances you record.",
  sections: [
    {
      image: "home_all",
      heading: "Everything in one view",
      alt: "Stacked chart colored by account, with cards for this month's return and year to date",
      body: [
        "Two brokerages, a crypto exchange, a foreign currency account, a bank. Each app shows its own balance. None of them can tell you the total, or whether you are up or down since last year.",
        "Fundlog stacks your accounts into one chart. The dotted line is what you put in. The gap between the band and the line is what your investments earned.",
      ],
    },
    {
      image: "chart",
      heading: "Contributions and returns, kept apart",
      alt: "Chart detail screen with the unit value index and period gains and returns",
      body: [
        "Your total went up by a thousand. Was that a deposit, or did the market move? Budgeting apps and brokerage apps blur the two.",
        "Fundlog records cash flows separately from balances and reports time-weighted returns and a unit value index. A month with a big deposit does not look like a good month.",
      ],
    },
    {
      image: "input",
      heading: "A few minutes, once a month",
      alt: "Batch entry screen with every account listed, previous values pre-filled, and a custom keypad",
      body: [
        "An app you type into only works if typing stays quick.",
        "All accounts sit in one list, pre-filled with the previous values. Retype only what changed. The custom keypad has a \"next account\" key, so you work down the list without the keyboard coming and going. If you deposited money that month, you note it right there.",
      ],
    },
    {
      image: "analysis",
      heading: "Monthly results and risk",
      alt: "Analysis screen with a monthly return heatmap and risk metrics such as maximum drawdown",
      body: [
        "A heatmap of monthly returns lines up the good months and the bad ones. Maximum drawdown, volatility and Sharpe ratio are calculated from your records too.",
        "Each metric opens a short explanation of what it means and how it is computed. The numbers are not left to speak for themselves.",
      ],
    },
    {
      image: "passbook",
      heading: "A passbook for every account",
      alt: "Account passbook screen listing balance entries and cash flows, newest first",
      body: [
        "Balances and cash flows for each account, newest first. Every row shows the change since the previous entry and the split between deposits and gains, so a typo in the digits stands out. Fix it on the spot.",
      ],
    },
    {
      image: "widgets",
      heading: "On the Home Screen",
      alt: "Fundlog widgets on the iPhone Home Screen: total assets with change, all-time return, and a grid of recorded days",
      body: [
        "Total assets with the change since your last entry, all-time return, and a grid of the days you recorded. No need to open the app. Amounts can be hidden so only percentages show.",
      ],
    },
    {
      image: "mask",
      heading: "Nothing leaves your phone",
      alt: "Home screen with amounts hidden",
      body: [
        "There is no sync with banks or brokers, on purpose. Many people are uneasy handing over login credentials. I was too.",
        "What you record stays on the device. No server, no account, no usage analytics. Backups are files you export yourself, and that is also how you move to a new phone. In company, one tap on the eye icon hides every amount.",
      ],
      facts: [
        ["Leaves the device", "Crash reports (no amounts or account names) and App Store purchases. Nothing else."],
        ["Account", "None"],
        ["Analytics", "None"],
        ["Backups", "Files you export. Excluded from iCloud backup as well."],
      ],
    },
  ],
}
