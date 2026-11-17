import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { formatAsOf, VALORANT_MAP_POOL } from "../config";
import RegionPage from "../RegionPage";

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
    for (const name of ["Pricing system", "Research hypotheses", "Champions post-mortems", "Veto calculator", "Field notes"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByText("Live pricing engine").closest("li")).toHaveTextContent("Building");
    expect(screen.getByText(/No posts yet/)).toBeInTheDocument();
    expect(screen.queryByText(/still being charted/)).not.toBeInTheDocument();
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
    expect(screen.getByText(`Map pool as of ${formatAsOf(VALORANT_MAP_POOL.asOf)}`)).toBeInTheDocument();
    for (const map of VALORANT_MAP_POOL.maps) expect(screen.getByLabelText(map)).toBeInTheDocument();
  });

  it("plays out the veto and can step back", () => {
    render(<RegionPage slug="valorant-ridge" />);
    expect(screen.getByText(/With best play from here/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Finish with best play" }));
    expect(screen.getByText(/of the time on/)).toHaveTextContent(/Team A wins the series \d+\.\d% of the time on \w+ \(\d+%\), \w+ \(\d+%\), \w+ \(\d+%\)\./);
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
    const tiles = within(screen.getByRole("navigation", { name: "Other regions" })).getAllByTestId("region-key-art");
    expect(tiles).toHaveLength(1);
    expect(tiles[0]).toHaveAttribute("loading", "lazy");
  });

  it("falls back to the drawn scenery if the key art fails to load", () => {
    const { container } = render(<RegionPage slug="valorant-ridge" />);
    const banner = container.querySelector("header") as HTMLElement;
    fireEvent.error(within(banner).getByTestId("region-key-art"));
    expect(within(banner).queryByTestId("region-key-art")).not.toBeInTheDocument();
    expect(within(banner).queryByTestId("region-art-scrim")).not.toBeInTheDocument();
    expect(banner.querySelector("svg")).toBeInTheDocument();
  });

  it("keeps the drawn scenery for regions without key art", () => {
    const { container } = render(<RegionPage slug="the-lab" />);
    const banner = container.querySelector("header") as HTMLElement;
    expect(within(banner).queryByTestId("region-key-art")).not.toBeInTheDocument();
    expect(within(banner).queryByTestId("region-art-scrim")).not.toBeInTheDocument();
    expect(banner).not.toHaveAttribute("data-art");
  });

  it("marks stubs as still being charted", () => {
    render(<RegionPage slug="piano-hall" />);
    expect(screen.getByText(/still being charted/)).toBeInTheDocument();
    expect(screen.getByText("Playable keyboard").closest("li")).toHaveTextContent("Planned");
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
