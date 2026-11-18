import { existsSync } from "fs";
import { join } from "path";
import { getRegion, postsFor, regionAnchors, REGIONS, t, worldTagline } from "..";
import { formatAsOf, mapPoolLabel, VALORANT_MAP_POOL } from "../config";
import type { Post, Text } from "../types";

/** Every Text-valued leaf in a piece of content. */
const texts = (x: unknown): Text[] => {
  if (typeof x === "string") return [x];
  if (Array.isArray(x)) return x.flatMap(texts);
  if (x && typeof x === "object") {
    if ("en" in x && "zh" in x) return [x as Text];
    return Object.values(x).flatMap(texts);
  }
  return [];
};

describe("region content", () => {
  it("has the five regions in order", () => {
    expect(REGIONS.map((r) => r.slug)).toEqual(["trading-floor", "valorant-ridge", "piano-hall", "far-shore", "the-lab"]);
    expect(worldTagline()).toBe("A world in five regions");
  });

  it("uses unique ids that don't collide with the template's own anchors", () => {
    for (const r of REGIONS) {
      const ids = r.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).not.toContain("field-notes");
      const entryIds = r.sections.flatMap((s) => s.entries.map((e) => e.id));
      expect(new Set(entryIds).size).toBe(entryIds.length);
    }
  });

  it("only uses bilingual text in regions that offer 中文", () => {
    for (const r of REGIONS) {
      const bilingual = texts(r).some((x) => typeof x !== "string");
      expect([r.slug, bilingual]).toEqual([r.slug, Boolean(r.languages?.includes("zh"))]);
    }
  });

  it("opens VALORANT Ridge with the veto calculator and keeps the rest as stubs", () => {
    const ridge = getRegion("valorant-ridge");
    expect(ridge?.state).toBe("open");
    expect(ridge?.sections.some((s) => s.widget?.key === "veto-calculator")).toBe(true);
    expect(REGIONS.filter((r) => r.state === "open")).toHaveLength(1);
  });

  it("uses the Patch 13.08 map pool", () => {
    expect(VALORANT_MAP_POOL.maps).toEqual(["Abyss", "Bind", "Corrode", "Haven", "Lotus", "Summit", "Sunset"]);
    expect(mapPoolLabel()).toBe("as of Patch 13.08 (Oct 2026)");
  });

  it("keeps the veto examples in step with the map pool in config.ts", () => {
    expect(VALORANT_MAP_POOL.maps).toHaveLength(7);
    expect(new Set(VALORANT_MAP_POOL.maps).size).toBe(7);
    const vetoes = REGIONS.flatMap((r) => r.sections).filter((s) => s.widget?.key === "veto-calculator");
    expect(vetoes.length).toBeGreaterThan(0);
    for (const s of vetoes) {
      // A mismatch means the pool rotated: update the examples in regions.ts.
      expect(Object.keys(s.widget!.props.example).sort()).toEqual([...VALORANT_MAP_POOL.maps].sort());
    }
  });

  it("states the research results on the Ridge", () => {
    const research = getRegion("valorant-ridge")?.sections.find((s) => s.id === "research");
    const label = (id: string) => research?.entries.find((e) => e.id === id)?.statusLabel;
    expect(label("region-lag")).toBe("Tested — no effect at close");
    expect(label("round-variance")).toBe("Tested — no effect at close");
    expect(label("roster-churn")).toBe("Pre-registered for Kickoff 2027");
  });

  it("gives every region key art that exists, with keep-clear boxes inside the image", () => {
    for (const r of REGIONS) {
      expect([r.slug, r.art?.src]).toEqual([r.slug, `/regions/${r.art?.src.split("/").pop()}`]);
      expect(existsSync(join(process.cwd(), "public", r.art!.src))).toBe(true);
      expect(r.art!.focus).toMatch(/^\d+% \d+%$/);
      expect(r.art!.keepClear?.length).toBeGreaterThan(0);
      for (const box of r.art!.keepClear!) {
        for (const [a, b] of [box.x, box.y]) {
          expect(0 <= a && a < b && b <= 1).toBe(true);
        }
      }
    }
  });

  it("labels the Far Shore's Mandarin as a draft", () => {
    expect(getRegion("far-shore")?.draftLanguages).toEqual(["zh"]);
  });

  it("places HI-LO on the Trading Floor and DerivaDash in the Lab", () => {
    const entryIds = (slug: string) => getRegion(slug)?.sections.flatMap((s) => s.entries.map((e) => e.id));
    expect(entryIds("trading-floor")).toContain("hi-lo");
    expect(entryIds("the-lab")).toContain("derivadash");
  });
});

describe("helpers", () => {
  it("formats the map pool label and rejects malformed values", () => {
    expect(formatAsOf("2026-10")).toBe("Oct 2026");
    expect(formatAsOf("2025-09")).toBe("Sep 2025");
    expect(() => formatAsOf("2025-13")).toThrow();
    expect(() => formatAsOf("Oct 2026")).toThrow();
    expect(mapPoolLabel({ patch: "12.01", asOf: "2026-01" })).toBe("as of Patch 12.01 (Jan 2026)");
    expect(() => mapPoolLabel({ patch: "13.8", asOf: "2026-10" })).toThrow();
  });

  it("t falls back to English", () => {
    expect(t("plain", "zh")).toBe("plain");
    expect(t({ en: "Far Shore", zh: "彼岸" }, "zh")).toBe("彼岸");
    expect(t({ en: "Far Shore", zh: "彼岸" })).toBe("Far Shore");
  });

  it("filters posts by region, newest first", () => {
    const posts: Post[] = [
      { slug: "a", title: "A", date: "2026-01-01", regions: ["valorant-ridge"], summary: "", href: "/a" },
      { slug: "b", title: "B", date: "2026-03-01", regions: ["valorant-ridge", "the-lab"], summary: "", href: "/b" },
      { slug: "c", title: "C", date: "2026-02-01", regions: ["the-lab"], summary: "", href: "/c" },
    ];
    expect(postsFor("valorant-ridge", posts).map((p) => p.slug)).toEqual(["b", "a"]);
    expect(postsFor("piano-hall", posts)).toEqual([]);
  });

  it("builds nav anchors from labelled sections", () => {
    const ridge = getRegion("valorant-ridge");
    expect(ridge && regionAnchors(ridge)).toEqual([
      { id: "pricing", label: "Pricing" },
      { id: "research", label: "Research" },
      { id: "post-mortems", label: "Post-mortems" },
      { id: "veto", label: "Veto" },
    ]);
  });
});
