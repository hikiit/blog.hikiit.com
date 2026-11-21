import * as React from "react"

import FootlootPage from "../../components/footloot-page"
import { en } from "../../components/footloot-copy"

const Page = () => (
  <FootlootPage
    lang="en"
    copy={en}
    altPath={{
      to: "/footloot/",
      href: "https://blog.hikiit.com/footloot/",
      lang: "ja",
      label: "日本語",
    }}
  />
)

export default Page
