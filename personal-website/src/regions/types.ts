// Content model for the region pages. Everything a region page shows comes
// from a `Region` object (see regions.ts), so pages change by editing data.

export type RegionSlug = "trading-floor" | "valorant-ridge" | "piano-hall" | "far-shore" | "the-lab";

export type Lang = "en" | "zh";

/** Plain text, or text with a Mandarin version for regions that offer 中文. */
export type Text = string | { en: string; zh: string };

/** Where a piece of work stands. Shown on every entry. */
export type Status = "shipped" | "building" | "testing" | "tested" | "preregistered" | "drafting" | "planned";

export interface Link {
  label: Text;
  href: string;
}

export interface Entry {
  id: string;
  title: Text;
  status: Status;
  /** Replaces the status's default label when a result needs saying, e.g. "Tested — no effect at close". */
  statusLabel?: Text;
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
  /** Example chances (percent) that the first team wins each map, by map name.
      The map pool itself lives in config.ts; maps missing here start at 50. */
  example: Record<string, number>;
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

/** A key art image that replaces the drawn scenery on the banner and tiles. */
export interface KeyArt {
  /** Path under public/, e.g. "/regions/ridge.webp". */
  src: string;
  /** CSS object-position: the point that stays in frame when the image is cropped. */
  focus: string;
  /** Parts of the image (fractions of its width and height) that must stay in frame
      and never sit behind banner text. `unshaded` ones also keep their original colour:
      the darkening behind text has a soft hole over them. Checked in the browser by
      e2e/keyart.spec.ts. */
  keepClear?: { label: string; x: [number, number]; y: [number, number]; unshaded?: boolean }[];
  /** Width / height of the image file. Defaults to 16/9. Used to place unshaded holes. */
  aspect?: number;
}

/**
 * A region's page colours for one theme. The page body derives everything else
 * (secondary text, dividers, tints) from these, the same way for every region.
 */
export interface Palette {
  /** Page background. */
  paper: string;
  /** Body text. */
  ink: string;
  /** Marks: rules, status dots, slider fill, focus. Not used for text. */
  accent: string;
  /** The accent dark (or light) enough to use for links and small text. */
  link: string;
  /** Alternate section bands: the region's second colour, from its scenery. */
  band: string;
  /** Raised surfaces: cards, the calculator, inputs. */
  card: string;
}

export interface Region {
  slug: RegionSlug;
  name: Text;
  /** One line for the home page tiles and the travel strip. */
  short: Text;
  /** The opening paragraph under the region name. */
  lede: Text;
  /** Drawn banner art. Also the fallback while `art` loads or if it fails. */
  scenery: SceneryKey;
  art?: KeyArt;
  /** Page colours for light and dark mode. */
  palette: { light: Palette; dark: Palette };
  /** One line under the banner while nothing in the region has shipped, in its voice.
      Under 15 words. */
  teaser: Text;
  /** Languages the page can switch between; the first is the default. */
  languages?: Lang[];
  /** Languages whose text is still a draft; the page labels them as such. */
  draftLanguages?: Lang[];
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
