import * as React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import "../styles/fundlog.css"

// 紹介ページの骨格。文面と画像は言語ごとのページから渡す。
// 記事一覧・RSS には載らない（Markdown ではないため）。サイトマップからも
// 除外し（gatsby-config）、検索エンジンにも noindex を返す。
const Shot = ({ image, alt, hero }) =>
  image ? (
    <div className={hero ? "fl-shot fl-shot--hero" : "fl-shot"}>
      <GatsbyImage image={image} alt={alt} />
    </div>
  ) : null

const FundlogPage = ({ lang, copy, images, path, altPath }) => {
  const img = name => {
    const node = images.find(n => n.name === name)
    return node ? getImage(node) : null
  }
  const sections = copy.sections.filter(s => img(s.image))

  return (
    <div className="fl">
      <Helmet htmlAttributes={{ lang }}>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:type" content="website" />
        <link rel="alternate" hrefLang={altPath.lang} href={altPath.href} />
      </Helmet>

      <div className="fl-wrap">
        <header className="fl-header">
          <div className="fl-wordmark">
            Fund<span>log</span>
          </div>
          <nav className="fl-header-nav">
            <Link to={altPath.to}>{altPath.label}</Link>
            <Link to="/">{copy.blog}</Link>
          </nav>
        </header>

        <section className="fl-hero">
          <div>
            <p className="fl-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.headline}</h1>
            <p className="fl-lead">{copy.lead}</p>
            <span className="fl-status">{copy.status}</span>
          </div>
          <Shot image={img("home")} alt={copy.heroAlt} hero />
        </section>

        <div className="fl-sections">
          {sections.map((s, i) => (
            <section
              key={s.image}
              className={i % 2 === 0 ? "fl-section" : "fl-section fl-section--flip"}
            >
              <div className="fl-section-text">
                <h2>{s.heading}</h2>
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.facts ? (
                  <dl className="fl-facts">
                    {s.facts.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {s.note ? <p className="fl-note">{s.note}</p> : null}
              </div>
              <Shot image={img(s.image)} alt={s.alt} />
            </section>
          ))}
        </div>

        <footer className="fl-footer">
          <p className="fl-note">{copy.disclaimer}</p>
          <div className="fl-footer-row">
            <span>© {new Date().getFullYear()} hikiit</span>
            <span>
              <Link to="/">{copy.blog}</Link>
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FundlogPage
