// Region content. Draft copy: edit freely; the pages are built from this file.
// Order here is the order on the home page and in the travel strip.

import type { Region } from "./types";

const tradingFloor: Region = {
  slug: "trading-floor",
  name: "Trading Floor",
  short: "Markets, probability, and the games that taught me both.",
  lede: "Markets and probability: what I took from Optiver, the bots I've built for prediction markets, and the card games where I first learned to price risk.",
  scenery: "ledger",
  state: "charting",
  sections: [
    {
      id: "write-ups",
      title: "Write-ups",
      navLabel: "Write-ups",
      entries: [
        { id: "optiver", title: "Optiver", status: "planned", summary: "What the internship taught me about pricing and decision-making, kept to what's public." },
        { id: "options-notes", title: "Options notes", status: "planned", summary: "Working notes on options pricing, volatility, and hedging." },
      ],
    },
    {
      id: "bots",
      title: "Bots",
      navLabel: "Bots",
      entries: [
        { id: "kalshi-crypto", title: "Kalshi crypto bot", status: "planned", summary: "A bot that trades Kalshi's crypto price markets." },
        { id: "world-cup-mm", title: "World Cup market-making bot", status: "planned", summary: "Quoting both sides of World Cup match markets." },
      ],
    },
    {
      id: "card-games",
      title: "Card games",
      navLabel: "Cards",
      entries: [
        { id: "card-game-analysis", title: "Card-game analysis", status: "planned", summary: "Working out the odds and best play in card games." },
        { id: "poker", title: "Poker", status: "planned", summary: "Pot-limit Omaha, a poker bot, and a solver competition." },
      ],
    },
    {
      id: "ledger",
      title: "Prediction ledger",
      navLabel: "Ledger",
      entries: [
        { id: "prediction-ledger", title: "Prediction ledger", status: "planned", summary: "Forecasts I've made, the probability I gave each one, and how it resolved. Scored on calibration, not profit." },
      ],
    },
  ],
};

const valorantRidge: Region = {
  slug: "valorant-ridge",
  name: "VALORANT Ridge",
  short: "Pricing, research, and post-mortems for pro VALORANT.",
  lede: "Where I model professional VALORANT: a pricing engine for match markets, the questions I'm testing with it, and a look back at each Champions.",
  scenery: "ridge",
  state: "open",
  facts: [
    "Covers tier-1 VCT from 2023 onward, plus the Esports World Cup.",
    "Prices whole series and single maps for Kalshi's VALORANT markets.",
    "Built on public match data from vlr.gg, fetched slowly and cached.",
  ],
  sections: [
    {
      id: "pricing",
      title: "Pricing system",
      navLabel: "Pricing",
      intro: "One engine turns each team's strength on each map and side into a fair price for a series or a single map, then reprices as the match moves.",
      entries: [
        {
          id: "live-engine",
          title: "Live pricing engine",
          status: "building",
          featured: true,
          summary: "A model of a best-of-three, built up from rounds to halves to maps to the series. It prices the match before it starts and again after every round.",
          details: [
            "Each team's attack and defence round-win rates on each map feed the round model. Alongside the fair price, the engine reports how much data stands behind it and how far the next update could move it.",
            "How it trades is still open. Paper trading will decide between taking a side when the model and the market disagree, quoting between rounds, or staying out.",
          ],
          points: [
            { label: "Markets", value: "Series winner, and each map" },
            { label: "Reprices", value: "After every round, and on a bomb plant" },
            { label: "Target", value: "Under 500 ms from event to new price" },
          ],
          links: [{ label: "Source on GitHub", href: "https://github.com/jxc2008/valorant-pricing-model" }],
        },
        {
          id: "side-baseline",
          title: "A side advantage counted twice",
          status: "drafting",
          summary: "Team side win rates already include the map's attack-side edge, and the old formula added it again: two average teams on a 55% attack map came out at 59.9%. The fix divides the map's baseline back out, so the same matchup now prices at 55%.",
        },
        {
          id: "thunderedge",
          title: "ThunderEdge",
          status: "shipped",
          summary: "The project this grew out of: a stats app that checks player kill lines against each player's per-map history at VCT events.",
          links: [{ label: "Source on GitHub", href: "https://github.com/jxc2008/thunderedge" }],
        },
      ],
    },
    {
      id: "research",
      title: "Research hypotheses",
      navLabel: "Research",
      intro: "Places where VALORANT markets might misprice, each tested only on seasons the model never trained on. Old vlr.gg pages keep only the winner's pre-match odds, so each result says how much it depends on the assumed bookmaker margin.",
      entries: [
        {
          id: "roster-churn",
          title: "Roster churn makes prices less reliable",
          status: "testing",
          summary: "After big roster changes, are favourites priced worse, and do underdogs return more at the real closing odds?",
          points: [{ label: "Churn", value: "Share of a team's starting five who are new since last season" }],
        },
        {
          id: "region-lag",
          title: "Regions lag at internationals",
          status: "testing",
          summary: "At an international event, a region whose teams have already fallen short of their prices against other regions may keep being overpriced until the market catches up.",
        },
        {
          id: "round-variance",
          title: "Some teams swing harder",
          status: "testing",
          summary: "Do some teams win and lose maps by wider round margins than their prices suggest? If so, handicap and map prices should be wider for them.",
        },
      ],
    },
    {
      id: "post-mortems",
      title: "Champions post-mortems",
      navLabel: "Post-mortems",
      intro: "After each Champions: where the model's prices held up, where they didn't, and what changed in the model because of it.",
      entries: [
        { id: "champions-2026", title: "Champions 2026", status: "planned", summary: "The model's price against the result for every match, and the biggest misses." },
        { id: "champions-2025", title: "Champions 2025", status: "planned", summary: "The same review, run on the model as it stood before the event." },
      ],
    },
    {
      id: "veto",
      title: "Veto calculator",
      navLabel: "Veto",
      intro: "Set each team's chance of winning every map. The calculator plays out the best-of-three veto: which maps each side should ban and pick, and what that does to the series price.",
      entries: [],
      widget: {
        key: "veto-calculator",
        props: {
          // Update when the competitive map pool rotates.
          pool: ["Ascent", "Bind", "Corrode", "Haven", "Icebox", "Lotus", "Sunset"],
          example: [62, 48, 55, 41, 66, 52, 37],
          teams: ["Team A", "Team B"],
        },
      },
    },
  ],
};

const pianoHall: Region = {
  slug: "piano-hall",
  name: "Piano Hall",
  short: "Piano and vocal recordings, and a keyboard to play.",
  lede: "Piano and vocal recordings, a keyboard you can play in the browser, and the pieces I'm learning now.",
  scenery: "hall",
  state: "charting",
  sections: [
    {
      id: "recordings",
      title: "Recordings",
      navLabel: "Recordings",
      entries: [
        { id: "piano", title: "Piano", status: "planned", summary: "Classical pieces, covers, and my own arrangements." },
        { id: "vocals", title: "Vocals", status: "planned", summary: "Songs I've recorded." },
      ],
    },
    {
      id: "keyboard",
      title: "Keyboard",
      navLabel: "Keyboard",
      entries: [{ id: "playable-keyboard", title: "Playable keyboard", status: "planned", summary: "A piano you can play with your mouse, touch, or computer keyboard." }],
    },
    {
      id: "learning",
      title: "Currently learning",
      navLabel: "Learning",
      entries: [{ id: "current-pieces", title: "On the stand", status: "planned", summary: "What I'm practising now, and how far along each piece is." }],
    },
  ],
};

const farShore: Region = {
  slug: "far-shore",
  name: { en: "Far Shore", zh: "彼岸" },
  short: { en: "Japan, food, streetwear, and Mandarin.", zh: "日本、美食、街头服饰与中文。" },
  lede: {
    en: "Life away from the screen: trips to Japan, food worth crossing town for, streetwear, and Mandarin.",
    zh: "屏幕之外的生活：日本之行、值得专程去吃的美食、街头服饰，还有中文。",
  },
  scenery: "shore",
  state: "charting",
  languages: ["en", "zh"],
  sections: [
    {
      id: "japan",
      title: { en: "Japan", zh: "日本" },
      navLabel: "Japan",
      entries: [{ id: "japan-trips", title: { en: "Trips", zh: "旅行" }, status: "planned", summary: { en: "Places, routes, and photos from Japan.", zh: "在日本去过的地方、路线和照片。" } }],
    },
    {
      id: "food",
      title: { en: "Food", zh: "美食" },
      navLabel: "Food",
      entries: [{ id: "food-list", title: { en: "Worth the trip", zh: "值得专程" }, status: "planned", summary: { en: "Restaurants and dishes I'd send a friend to.", zh: "会推荐给朋友的餐厅和菜。" } }],
    },
    {
      id: "streetwear",
      title: { en: "Streetwear", zh: "街头服饰" },
      navLabel: "Streetwear",
      entries: [{ id: "fits", title: { en: "Fits and finds", zh: "穿搭与收藏" }, status: "planned", summary: { en: "Brands, pieces, and outfits I like.", zh: "喜欢的品牌、单品和穿搭。" } }],
    },
    {
      id: "mandarin",
      title: { en: "Mandarin", zh: "中文" },
      navLabel: "Mandarin",
      entries: [{ id: "mandarin-notes", title: { en: "Notes", zh: "笔记" }, status: "planned", summary: { en: "Writing in Mandarin, with an English version alongside.", zh: "用中文写的内容，附英文版本。" } }],
    },
  ],
};

const theLab: Region = {
  slug: "the-lab",
  name: "The Lab",
  short: "Simulations, tools, and teaching.",
  lede: "Simulations and tools for thinking with math: a three-body simulation, a playground for option Greeks, the quant team's open course, and coursework projects.",
  scenery: "orbits",
  state: "charting",
  sections: [
    {
      id: "simulations",
      title: "Simulations",
      navLabel: "Simulations",
      entries: [
        {
          id: "three-body",
          title: "Three-body simulation",
          status: "shipped",
          summary: "Three bodies under gravity, in real time. Change the masses and the gravitational constant and watch the orbits break apart.",
          links: [{ label: "Open the simulation", href: "/three-body-simulation" }],
        },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      navLabel: "Tools",
      entries: [{ id: "greeks", title: "Greeks playground", status: "planned", summary: "Move spot, volatility, and time, and see how an option's price and Greeks respond." }],
    },
    {
      id: "teaching",
      title: "Teaching",
      navLabel: "Teaching",
      entries: [{ id: "quant-course", title: "Quant team open course", status: "planned", summary: "The quant team's course material, open to anyone." }],
    },
    {
      id: "coursework",
      title: "Coursework",
      navLabel: "Coursework",
      entries: [{ id: "coursework-projects", title: "Coursework projects", status: "planned", summary: "Selected projects from CS and math classes at NYU." }],
    },
  ],
};

export const REGIONS: Region[] = [tradingFloor, valorantRidge, pianoHall, farShore, theLab];
