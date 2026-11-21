import * as React from "react"

import FootlootPage from "../../components/footloot-page"
import { ja } from "../../components/footloot-copy"

const Page = () => (
  <FootlootPage
    lang="ja"
    copy={ja}
    altPath={{
      to: "/footloot/en/",
      href: "https://blog.hikiit.com/footloot/en/",
      lang: "en",
      label: "English",
    }}
  />
)

export default Page
