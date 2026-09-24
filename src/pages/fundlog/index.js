import * as React from "react"
import { graphql } from "gatsby"

import FundlogPage from "../../components/fundlog-page"
import { ja } from "../../components/fundlog-copy"

const Page = ({ data }) => (
  <FundlogPage
    lang="ja"
    copy={ja}
    images={data.allFile.nodes}
    altPath={{ to: "/fundlog/en/", href: "https://blog.hikiit.com/fundlog/en/", lang: "en", label: "English" }}
  />
)

export default Page

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "fundlog/ja" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 720, quality: 85, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  }
`
