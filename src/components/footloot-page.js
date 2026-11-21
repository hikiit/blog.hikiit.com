import * as React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import "../styles/footloot.css"

// 探検日和（Footloot）の紹介ページの骨格。文面は言語ごとのページから渡す。
// 記事一覧・RSS には載らない（Markdown ではないため）。サイトマップからも
// 除外し（gatsby-config）、検索エンジンにも noindex を返す。
//
// 画像は gatsby-plugin-image を通さず、書き出した大きさのまま出す。ドット絵は、
// 縮め直すとドットの縁がぼやけるため（アプリも、絵を補間せずに整数倍で出している）。
// 電話の画面は、iPhone の大きさ（幅 402pt）を 2 倍と 3 倍で描いたものを、その
// 大きさ（402px）で出す（上の端の、時刻などが出る帯は切ってある）。素材の絵
// （世界の帯・アイコン）は、ドットを 6 倍にしてあるので、1 倍・2 倍・3 倍の
// どの画面でも割り切れる。iPhone Duo の画面は 3 倍で描いたものを、そのまま置く。
const files = require.context("../images/footloot", true, /\.png$/)
const src = path => {
  const file = files(`./${path}`)
  return file.default || file
}

// 見出し：文字列はそのまま。配列は、要素ごとにひとまとまりで折り返す
const phrases = text =>
  Array.isArray(text)
    ? text.map(t => (
        <span key={t} className="ftl-phrase">
          {t}
        </span>
      ))
    : text

const Phone = ({ lang, name, alt, eager }) => (
  <div className="ftl-phone">
    <img
      src={src(`${lang}/${name}.png`)}
      srcSet={`${src(`${lang}/${name}.png`)} 2x, ${src(
        `${lang}/${name}@3x.png`
      )} 3x`}
      width="402"
      height="812"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  </div>
)

const Facts = ({ facts }) => (
  <dl className="ftl-facts">
    {facts.map(([k, v]) => (
      <div key={k}>
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
)

const Heading = ({ icon, children }) => (
  <h2>
    {icon ? (
      <img
        className="ftl-icon"
        src={src(`shared/ui-${icon}.png`)}
        width="32"
        height="32"
        alt=""
      />
    ) : null}
    <span>{phrases(children)}</span>
  </h2>
)

const Section = ({ lang, section, flip }) => (
  <section className={flip ? "ftl-section ftl-section--flip" : "ftl-section"}>
    <div className="ftl-section-text">
      <Heading icon={section.icon}>{section.heading}</Heading>
      {section.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {section.quote ? (
        <figure className="ftl-diary">
          <figcaption>{section.quote.label}</figcaption>
          <blockquote>{section.quote.text}</blockquote>
        </figure>
      ) : null}
      {section.facts ? <Facts facts={section.facts} /> : null}
    </div>
    <Phone lang={lang} name={section.image} alt={section.alt} />
  </section>
)

const FootlootPage = ({ lang, copy, altPath }) => {
  const [first, ...rest] = copy.sections

  return (
    <div className="ftl">
      <Helmet htmlAttributes={{ lang }}>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:type" content="website" />
        <link rel="alternate" hrefLang={altPath.lang} href={altPath.href} />
        {/* アプリと同じ書体（DotGothic16。SIL Open Font License） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
        />
      </Helmet>

      <div className="ftl-wrap">
        <header className="ftl-header">
          <div className="ftl-wordmark">
            <img src={src("shared/icon.png")} width="32" height="32" alt="" />
            <span>{copy.name}</span>
          </div>
          <nav className="ftl-header-nav">
            <Link to={altPath.to}>{altPath.label}</Link>
            <Link to="/">{copy.blog}</Link>
          </nav>
        </header>

        <section className="ftl-hero">
          <div className="ftl-hero-text">
            <p className="ftl-eyebrow">{copy.eyebrow}</p>
            <h1>{phrases(copy.headline)}</h1>
            <p className="ftl-lead">{copy.lead}</p>
            <span className="ftl-status">{copy.status}</span>
          </div>
          <Phone lang={lang} name="home" alt={copy.heroAlt} eager />
        </section>

        <Section lang={lang} section={first} flip />

        <section className="ftl-block">
          <Heading>{copy.worlds.heading}</Heading>
          <p className="ftl-block-lead">{copy.worlds.lead}</p>
          <ul className="ftl-worlds">
            {copy.worlds.items.map(w => (
              <li key={w.id}>
                <img
                  src={src(`shared/world-${w.id}.png`)}
                  width="432"
                  height="120"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>
                    {w.name}
                    {w.tag ? <span className="ftl-tag">{w.tag}</span> : null}
                  </h3>
                  <p>{w.intro}</p>
                  <p className="ftl-worlds-steps">{w.steps}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {rest.map((s, i) => (
          <Section key={s.image} lang={lang} section={s} flip={i % 2 === 1} />
        ))}

        <section className="ftl-block">
          <Heading>{copy.duo.heading}</Heading>
          {copy.duo.body.map((p, i) => (
            <p key={i} className="ftl-block-lead">
              {p}
            </p>
          ))}
          {copy.duo.shots.map(s => (
            <figure key={s.image} className="ftl-wide">
              <img
                src={src(`${lang}/${s.image}.png`)}
                width="951"
                height="669"
                alt={s.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
          <div className="ftl-thumbs">
            {copy.duo.thumbs.map(s => (
              <figure
                key={s.image}
                className={`ftl-thumb ftl-thumb--${s.image}`}
              >
                <img
                  src={src(`${lang}/${s.image}.png`)}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="ftl-block">
          <Heading>{copy.details.heading}</Heading>
          <Facts facts={copy.details.facts} />
        </section>

        <footer className="ftl-footer">
          {copy.notes.map((n, i) => (
            <p key={i} className="ftl-note">
              {n}
            </p>
          ))}
          <div className="ftl-footer-row">
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

export default FootlootPage
