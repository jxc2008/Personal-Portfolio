import { POSTS } from "./posts";
import { REGIONS } from "./regions";
import type { Lang, Post, Region, Status, Text } from "./types";

export { REGIONS, POSTS };
export type { Entry, Lang, Link, Post, Region, RegionSlug, SceneryKey, Section, Status, Text, VetoWidgetProps, WidgetRef } from "./types";

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

/** Floating-nav anchors for a region page. */
export function regionAnchors(region: Region): { id: string; label: string }[] {
  return region.sections.filter((s) => s.navLabel).map((s) => ({ id: s.id, label: s.navLabel as string }));
}
