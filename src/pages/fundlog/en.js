import * as React from "react"
import { graphql } from "gatsby"

import FundlogPage from "../../components/fundlog-page"
import { en } from "../../components/fundlog-copy"

const Page = ({ data }) => (
  <FundlogPage
    lang="en"
    copy={en}
    images={data.allFile.nodes}
    altPath={{ to: "/fundlog/", href: "https://blog.hikiit.com/fundlog/", lang: "ja", label: "日本語" }}
  />
)

export default Page

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "fundlog/en" }
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
