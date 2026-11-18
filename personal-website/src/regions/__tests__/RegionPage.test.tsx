import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { VALORANT_MAP_POOL } from "../config";
import { getRegion, type Region } from "..";
import RegionPage from "../RegionPage";
import RegionArt from "../scenery/RegionArt";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("RegionPage", () => {
  it("renders VALORANT Ridge from its data", () => {
    render(<RegionPage slug="valorant-ridge" />);
    expect(screen.getByRole("heading", { level: 1, name: "VALORANT Ridge" })).toBeInTheDocument();
    for (const name of ["Pricing system", "Research hypotheses", "Veto calculator", "Field notes"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByText("Live pricing engine").closest("li")).toHaveTextContent("Building");
    expect(screen.getByText("Notes coming soon.")).toBeInTheDocument();
    // Planned and drafting work is hidden, and so is a section left with nothing.
    expect(screen.queryByRole("heading", { name: "Champions post-mortems" })).not.toBeInTheDocument();
    expect(screen.queryByText("A side advantage counted twice")).not.toBeInTheDocument();
    expect(screen.queryByText(/Planned|Drafting/)).not.toBeInTheDocument();
    // Something has shipped here, so no teaser.
    expect(screen.queryByText("Pricing pro VALORANT, one round at a time.")).not.toBeInTheDocument();
  });

  it("links to the four other regions", () => {
    render(<RegionPage slug="valorant-ridge" />);
    const travel = screen.getByRole("navigation", { name: "Other regions" });
    expect(within(travel).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "/regions/trading-floor",
      "/regions/piano-hall",
      "/regions/far-shore",
      "/regions/the-lab",
    ]);
  });

  it("shows when the map pool was last updated", () => {
    render(<RegionPage slug="valorant-ridge" />);
    expect(screen.getByText("Map pool as of Patch 13.08 (Oct 2026)")).toBeInTheDocument();
    for (const map of VALORANT_MAP_POOL.maps) expect(screen.getByLabelText(map)).toBeInTheDocument();
  });

  it("plays out the veto and can step back", () => {
    render(<RegionPage slug="valorant-ridge" />);
    expect(screen.getByText(/With best play from here/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Finish with best play" }));
    const result = screen.getByText(/of the time on/);
    expect(result).toHaveTextContent(/Team A wins the series \d+\.\d% of the time on \w+ \(\d+%\), \w+ \(\d+%\), \w+ \(\d+%\)\./);
    // The three maps played all come from the current pool.
    const played = Array.from(result.textContent!.matchAll(/(\w+) \(\d+%\)/g), (m) => m[1]);
    expect(played).toHaveLength(3);
    for (const map of played) expect(VALORANT_MAP_POOL.maps).toContain(map);
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getByText(/With best play from here/)).toBeInTheDocument();
  });

  it("shows the Ridge key art on the banner and its tile, over the drawn scenery", () => {
    const { container } = render(<RegionPage slug="valorant-ridge" />);
    const banner = container.querySelector("header");
    const art = within(banner as HTMLElement).getByTestId("region-key-art");
    expect(art).toHaveAttribute("src", "/regions/ridge.webp");
    expect(art).toHaveStyle({ objectPosition: "58% 52%" });
    expect(art).toHaveAttribute("fetchpriority", "high");
    expect(banner?.querySelector("svg")).toBeInTheDocument();
    expect(banner).toHaveAttribute("data-art");
    expect(within(banner as HTMLElement).getByTestId("region-art-scrim")).toHaveAttribute("data-variant", "banner");
    document.body.innerHTML = "";
    render(<RegionPage slug="piano-hall" />);
    const strip = screen.getByRole("navigation", { name: "Other regions" });
    const ridgeTile = within(strip).getByRole("link", { name: /VALORANT Ridge/ });
    const tileArt = within(ridgeTile).getByTestId("region-key-art");
    expect(tileArt).toHaveAttribute("src", "/regions/ridge.webp");
    expect(tileArt).toHaveAttribute("loading", "lazy");
  });

  it("gives every region its own key art, on its banner and on its tiles", () => {
    const art: Record<string, string> = {
      "trading-floor": "/regions/trading.webp",
      "valorant-ridge": "/regions/ridge.webp",
      "piano-hall": "/regions/piano.webp",
      "far-shore": "/regions/shore.webp",
      "the-lab": "/regions/lab.webp",
    };
    for (const [slug, src] of Object.entries(art)) {
      const { container, unmount } = render(<RegionPage slug={slug as Region["slug"]} />);
      expect(within(container.querySelector("header") as HTMLElement).getByTestId("region-key-art")).toHaveAttribute("src", src);
      // Each "Other regions" tile shows its own region's art.
      for (const link of within(screen.getByRole("navigation", { name: "Other regions" })).getAllByRole("link")) {
        const other = link.getAttribute("href")!.replace("/regions/", "");
        expect(within(link).getByTestId("region-key-art")).toHaveAttribute("src", art[other]);
      }
      unmount();
    }
  });

  it("falls back to the drawn scenery if the key art fails to load", () => {
    const { container } = render(<RegionPage slug="valorant-ridge" />);
    const banner = container.querySelector("header") as HTMLElement;
    fireEvent.error(within(banner).getByTestId("region-key-art"));
    expect(within(banner).queryByTestId("region-key-art")).not.toBeInTheDocument();
    expect(within(banner).queryByTestId("region-art-scrim")).not.toBeInTheDocument();
    expect(banner).not.toHaveAttribute("data-art");
    expect(banner.querySelector("svg")).toBeInTheDocument();
  });

  it("draws the scenery alone for a region without key art", () => {
    const lab = { ...(getRegion("the-lab") as Region), art: undefined };
    const { container } = render(<RegionArt region={lab} variant="banner" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByTestId("region-key-art")).not.toBeInTheDocument();
    expect(screen.queryByTestId("region-art-scrim")).not.toBeInTheDocument();
  });

  it("shows the research results as statuses", () => {
    render(<RegionPage slug="valorant-ridge" />);
    expect(screen.getByText("Regions lag at internationals").closest("li")).toHaveTextContent("Tested — no effect at close");
    expect(screen.getByText("Some teams swing harder").closest("li")).toHaveTextContent("Tested — no effect at close");
    expect(screen.getByText("Roster churn makes prices less reliable").closest("li")).toHaveTextContent("Pre-registered for Kickoff 2027");
  });

  it("shows a region with nothing shipped as its banner, a teaser and field notes", () => {
    render(<RegionPage slug="piano-hall" />);
    expect(screen.getByText("Recordings, and a piano you can play right here, are on their way.")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["Field notes", "Other regions"]);
    expect(screen.queryByText("Playable keyboard")).not.toBeInTheDocument();
    expect(screen.queryByText(/still being charted/)).not.toBeInTheDocument();
  });

  it("shows planned and drafting work when the dev flag is on", () => {
    render(<RegionPage slug="piano-hall" showUnfinished />);
    expect(screen.getByText("Playable keyboard").closest("li")).toHaveTextContent("Planned");
    document.body.innerHTML = "";
    render(<RegionPage slug="valorant-ridge" showUnfinished />);
    expect(screen.getByRole("heading", { level: 2, name: "Champions post-mortems" })).toBeInTheDocument();
    expect(screen.getByText("A side advantage counted twice").closest("li")).toHaveTextContent("Drafting");
  });

  it("labels the other regions Open or Coming soon by whether anything has shipped", () => {
    render(<RegionPage slug="valorant-ridge" />);
    const strip = screen.getByRole("navigation", { name: "Other regions" });
    const label = (name: RegExp) => within(strip).getByRole("link", { name }).lastElementChild?.textContent;
    expect(label(/Trading Floor/)).toBe("Open");
    expect(label(/Piano Hall/)).toBe("Coming soon");
    expect(label(/Far Shore/)).toBe("Coming soon");
    expect(label(/The Lab/)).toBe("Open");
  });

  it("switches the Far Shore to 中文", () => {
    const { container } = render(<RegionPage slug="far-shore" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Far Shore");
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("彼岸");
    expect(container.querySelector("article")).toHaveAttribute("lang", "zh-Hans");
    expect(screen.getByRole("button", { name: "中文" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("中文译文为草稿")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(screen.queryByText("中文译文为草稿")).not.toBeInTheDocument();
  });

  it("links HI-LO and DerivaDash to their live sites", () => {
    render(<RegionPage slug="trading-floor" />);
    expect(screen.getByRole("link", { name: "Play HI-LO" })).toHaveAttribute("href", "https://hi-lo-quant-trading-game.vercel.app");
    document.body.innerHTML = "";
    render(<RegionPage slug="the-lab" />);
    expect(screen.getByRole("link", { name: "Open DerivaDash" })).toHaveAttribute("href", "https://derivadash.com");
  });
});
