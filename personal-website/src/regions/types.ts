// Content model for the region pages. Everything a region page shows comes
// from a `Region` object (see regions.ts), so pages change by editing data.

export type RegionSlug = "trading-floor" | "valorant-ridge" | "piano-hall" | "far-shore" | "the-lab";

export type Lang = "en" | "zh";

/** Plain text, or text with a Mandarin version for regions that offer 中文. */
export type Text = string | { en: string; zh: string };

/** Where a piece of work stands. Shown on every entry. */
export type Status = "shipped" | "building" | "testing" | "drafting" | "planned";

export interface Link {
  label: Text;
  href: string;
}

export interface Entry {
  id: string;
  title: Text;
  status: Status;
  summary: Text;
  /** Longer paragraphs. Entries with details render as a full row. */
  details?: Text[];
  /** Short facts, shown as a small definition list. */
  points?: { label: Text; value: Text }[];
  links?: Link[];
  /** Shown first and larger in its section. */
  featured?: boolean;
}

/** Interactive pieces that a section can embed, looked up by key in widgets/index.ts. */
export type WidgetRef = { key: "veto-calculator"; props: VetoWidgetProps };

export interface VetoWidgetProps {
  /** Current map pool, in display order. */
  pool: string[];
  /** Example chances (percent) that the first team wins each map, same order as `pool`. */
  example: number[];
  teams: [string, string];
}

export interface Section {
  id: string;
  title: Text;
  /** Short label for the floating nav. Sections without one stay out of the nav. */
  navLabel?: string;
  intro?: Text;
  entries: Entry[];
  widget?: WidgetRef;
}

export type SceneryKey = "ledger" | "ridge" | "hall" | "shore" | "orbits";

export interface Region {
  slug: RegionSlug;
  name: Text;
  /** One line for the home page tiles and the travel strip. */
  short: Text;
  /** The opening paragraph under the region name. */
  lede: Text;
  scenery: SceneryKey;
  /** "open": the region has real content. "charting": a stub listing what's planned. */
  state: "open" | "charting";
  /** Languages the page can switch between; the first is the default. */
  languages?: Lang[];
  /** A few plain sentences under the banner. */
  facts?: Text[];
  sections: Section[];
}

/** Writing. Posts appear on every region they're tagged with. */
export interface Post {
  slug: string;
  title: string;
  /** ISO date, e.g. "2027-01-15". */
  date: string;
  regions: RegionSlug[];
  summary: string;
  href: string;
}
