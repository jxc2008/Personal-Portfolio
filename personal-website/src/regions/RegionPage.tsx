"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { getRegion, postsFor, REGIONS, STATUS_LABEL, t } from "./index";
import { REGION_FONT } from "./fonts";
import RegionTile from "./RegionTile";
import RegionArt from "./scenery/RegionArt";
import type { Entry, Lang, Region, Section } from "./types";
import Widget from "./widgets";
import themes from "./themes.module.css";
import styles from "./RegionPage.module.css";

const HTML_LANG: Record<Lang, string> = { en: "en", zh: "zh-Hans" };
const SWITCH_LABEL: Record<Lang, string> = { en: "English", zh: "中文" };
const DRAFT_LABEL: Record<Lang, string> = { en: "Draft text", zh: "中文译文为草稿" };

function EntryRow({ entry, lang }: { entry: Entry; lang: Lang }) {
  return (
    <li className={`${styles.entry} ${entry.featured ? styles.featured : ""}`}>
      <div className={styles.entryHead}>
        <h3 className={styles.entryTitle}>{t(entry.title, lang)}</h3>
        <span className={styles.status} data-status={entry.status}>
          {STATUS_LABEL[entry.status]}
        </span>
      </div>
      <p className={styles.summary}>{t(entry.summary, lang)}</p>
      {entry.details?.map((d, i) => (
        <p key={i} className={styles.detail}>
          {t(d, lang)}
        </p>
      ))}
      {entry.points && (
        <dl className={styles.points}>
          {entry.points.map((pt, i) => (
            <div key={i}>
              <dt>{t(pt.label, lang)}</dt>
              <dd>{t(pt.value, lang)}</dd>
            </div>
          ))}
        </dl>
      )}
      {entry.links && (
        <p className={styles.links}>
          {entry.links.map((l) => (
            <a key={l.href} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {t(l.label, lang)}
            </a>
          ))}
        </p>
      )}
    </li>
  );
}

function SectionBlock({ section, lang }: { section: Section; lang: Lang }) {
  const headingId = `${section.id}-title`;
  return (
    <section id={section.id} className={`${styles.section} ${section.widget ? styles.wide : ""}`} aria-labelledby={headingId}>
      <div className={styles.sectionHead}>
        <h2 id={headingId} className={styles.sectionTitle}>
          {t(section.title, lang)}
        </h2>
        {section.intro && <p className={styles.intro}>{t(section.intro, lang)}</p>}
      </div>
      <div className={styles.sectionBody}>
        {section.entries.length > 0 && (
          <ul className={styles.entries}>
            {section.entries.map((e) => (
              <EntryRow key={e.id} entry={e} lang={lang} />
            ))}
          </ul>
        )}
        {section.widget && <Widget widget={section.widget} />}
      </div>
    </section>
  );
}

export default function RegionPage({ slug }: { slug: Region["slug"] }) {
  const region = getRegion(slug) as Region;
  const languages = region.languages ?? ["en"];
  const [lang, setLang] = useState<Lang>(languages[0]);
  // The banner lays out for key art only while the art is showing; if it fails, the drawn banner and its usual layout return.
  const [artFailed, setArtFailed] = useState(false);
  const onArtFail = useCallback(() => setArtFailed(true), []);
  const bannerRef = useRef<HTMLElement>(null);
  const posts = postsFor(region.slug);
  const others = REGIONS.filter((r) => r.slug !== region.slug);

  // Pointer parallax for the scenery layers; mouse only, and off under reduced motion (in CSS).
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = bannerRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onPointerLeave = () => {
    bannerRef.current?.style.setProperty("--px", "0");
    bannerRef.current?.style.setProperty("--py", "0");
  };

  return (
    <article
      className={`${themes.theme} ${REGION_FONT[region.slug]} ${styles.page}`}
      data-region={region.slug}
      lang={HTML_LANG[lang]}
    >
      <header
        ref={bannerRef}
        className={styles.banner}
        data-art={region.art && !artFailed ? "" : undefined}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className={styles.bannerArt}>
          <RegionArt region={region} variant="banner" onFail={onArtFail} />
        </div>
        <div className={styles.bannerCopy}>
          <h1 className={styles.name}>{t(region.name, lang)}</h1>
          <p className={styles.lede}>{t(region.lede, lang)}</p>
          {languages.length > 1 && (
            <div className={styles.langRow}>
              <div className={styles.langSwitch} role="group" aria-label="Language">
                {languages.map((l) => (
                  <button key={l} type="button" lang={HTML_LANG[l]} aria-pressed={lang === l} onClick={() => setLang(l)}>
                    {SWITCH_LABEL[l]}
                  </button>
                ))}
              </div>
              {region.draftLanguages?.includes(lang) && <span className={styles.draftTag}>{DRAFT_LABEL[lang]}</span>}
            </div>
          )}
        </div>
      </header>

      <div className={styles.body}>
        {region.facts && (
          <ul className={styles.facts}>
            {region.facts.map((f, i) => (
              <li key={i}>{t(f, lang)}</li>
            ))}
          </ul>
        )}
        {region.state === "charting" && (
          <p className={styles.charting}>
            {lang === "zh" ? "这片区域还在绘制中。以下是计划中的内容。" : "This region is still being charted. Here's what's planned."}
          </p>
        )}

        {region.sections.map((s) => (
          <SectionBlock key={s.id} section={s} lang={lang} />
        ))}

        <section id="field-notes" className={styles.section} aria-labelledby="field-notes-title">
          <div className={styles.sectionHead}>
            <h2 id="field-notes-title" className={styles.sectionTitle}>
              {lang === "zh" ? "随笔" : "Field notes"}
            </h2>
          </div>
          <div className={styles.sectionBody}>
            {posts.length > 0 ? (
              <ul className={styles.entries}>
                {posts.map((p) => (
                  <li key={p.slug} className={styles.entry}>
                    <a href={p.href} className={styles.postLink}>
                      <span className={styles.entryTitle}>{p.title}</span>
                      <time dateTime={p.date} className={styles.postDate}>
                        {new Date(`${p.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
                      </time>
                    </a>
                    <p className={styles.summary}>{p.summary}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>
                {lang === "zh" ? "还没有文章。" : "No posts yet."} {lang === "zh" ? "关于这片区域的文章会出现在这里。" : `Writing about ${t(region.name)} will collect here.`}
              </p>
            )}
          </div>
        </section>
      </div>

      <nav className={styles.travel} aria-labelledby="travel-title">
        <h2 id="travel-title" className={styles.travelTitle}>
          {lang === "zh" ? "其他区域" : "Other regions"}
        </h2>
        <ul className={styles.travelList}>
          {others.map((r) => (
            <li key={r.slug}>
              <RegionTile region={r} size="wide" />
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
