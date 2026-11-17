// One display face per region, exposed as --r-display on the element that
// carries the class. Not preloaded: each page only needs one of them.

import { Bodoni_Moda, Gloock, IBM_Plex_Mono, Shippori_Mincho, Sofia_Sans_Condensed } from "next/font/google";
import type { RegionSlug } from "./types";

const ridge = Sofia_Sans_Condensed({ subsets: ["latin"], weight: "variable", variable: "--r-display", display: "swap", preload: false });
const floor = Bodoni_Moda({ subsets: ["latin"], weight: "variable", variable: "--r-display", display: "swap", preload: false });
const hall = Gloock({ subsets: ["latin"], weight: "400", variable: "--r-display", display: "swap", preload: false });
const shore = Shippori_Mincho({ subsets: ["latin"], weight: ["500", "700"], variable: "--r-display", display: "swap", preload: false });
const lab = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--r-display", display: "swap", preload: false });

export const REGION_FONT: Record<RegionSlug, string> = {
  "valorant-ridge": ridge.variable,
  "trading-floor": floor.variable,
  "piano-hall": hall.variable,
  "far-shore": shore.variable,
  "the-lab": lab.variable,
};
