import { POSTS } from "./posts";
import { REGIONS } from "./regions";
import type { Entry, Lang, Post, Region, Section, Status, Text } from "./types";

export { REGIONS, POSTS };
export type { Palette, Entry, Lang, Link, Post, Region, RegionSlug, KeyArt, SceneryKey, Section, Status, Text, VetoWidgetProps, WidgetRef } from "./types";

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

/** Picks the right language, falling back to English. */
export function t(text: Text, lang: Lang = "en"): string {
  return typeof text === "string" ? text : text[lang] ?? text.en;
}

export const STATUS_LABEL: Record<Status, string> = {
  shipped: "Shipped",
  building: "Building",
  testing: "Testing",
  tested: "Tested",
  preregistered: "Pre-registered",
  drafting: "Drafting",
  planned: "Planned",
};

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** "A world in five regions", counted from the data. */
export function worldTagline(count = REGIONS.length): string {
  return `A world in ${WORDS[count] ?? count} region${count === 1 ? "" : "s"}`;
}

export function postsFor(slug: Region["slug"], posts: Post[] = POSTS): Post[] {
  return posts.filter((p) => p.regions.includes(slug)).sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Planned and drafting work stays in regions.ts but off the public site. To see it while
 * working locally, run the dev server with NEXT_PUBLIC_SHOW_UNFINISHED=1; production
 * builds ignore the flag.
 */
export const SHOW_UNFINISHED = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_UNFINISHED === "1";

const UNFINISHED: Status[] = ["planned", "drafting"];

export function isPublic(entry: Entry, showUnfinished = SHOW_UNFINISHED): boolean {
  return showUnfinished || !UNFINISHED.includes(entry.status);
}

/** A region's sections as the page shows them: hidden entries removed, and sections left
    with nothing to show dropped (a section with a widget always has something). */
export function visibleSections(region: Region, showUnfinished = SHOW_UNFINISHED): Section[] {
  return region.sections
    .map((s) => ({ ...s, entries: s.entries.filter((e) => isPublic(e, showUnfinished)) }))
    .filter((s) => s.entries.length > 0 || s.widget);
}

/** Whether a region has shipped anything: it's "Open" on the tiles; otherwise it shows a teaser. */
export function hasShipped(region: Region): boolean {
  return region.sections.some((s) => s.entries.some((e) => e.status === "shipped"));
}

/** Floating-nav anchors for a region page: its visible, labelled sections. */
export function regionAnchors(region: Region, showUnfinished = SHOW_UNFINISHED): { id: string; label: string }[] {
  return visibleSections(region, showUnfinished)
    .filter((s) => s.navLabel)
    .map((s) => ({ id: s.id, label: s.navLabel as string }));
}

/**
 * A region's palette as CSS custom properties (--pl-* light, --pd-* dark), set on
 * the element that carries its theme. themes.module.css picks the set for the
 * current theme and derives the rest.
 */
export function paletteVars(region: Region): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [theme, prefix] of [["light", "--pl-"], ["dark", "--pd-"]] as const) {
    for (const [key, value] of Object.entries(region.palette[theme])) out[prefix + key] = value;
  }
  return out;
}
