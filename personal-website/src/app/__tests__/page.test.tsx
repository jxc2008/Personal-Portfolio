import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import Home from "../page";

jest.mock("../components/hero/Hero", () => ({
  __esModule: true,
  default: ({ nextId }: { nextId: string }) => <section data-testid="hero" data-next={nextId} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ priority, ...props }: Record<string, unknown>) => <img {...(props as object)} />,
}));

jest.mock("framer-motion", () => {
  const strip = ({ children, initial, animate, whileInView, viewport, variants, transition, style, ...rest }: Record<string, unknown>) => ({
    children: children as ReactNode,
    rest,
  });
  const make = (Tag: "div" | "section") =>
    function Motion(props: Record<string, unknown>) {
      const { children, rest } = strip(props);
      return <Tag {...(rest as object)}>{children}</Tag>;
    };
  return {
    motion: { div: make("div"), section: make("section") },
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  };
});

describe("Home page", () => {
  beforeEach(() => render(<Home />));

  it("opens with the hero, whose scroll cue targets the regions", () => {
    const hero = screen.getByTestId("hero");
    expect(hero).toHaveAttribute("data-next", "regions");
    expect(document.getElementById("regions")).toBeInTheDocument();
  });

  it("links to all five regions, in order", () => {
    const hrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"))
      .filter((h) => h?.startsWith("/regions/"));
    expect(hrefs).toEqual([
      "/regions/trading-floor",
      "/regions/valorant-ridge",
      "/regions/piano-hall",
      "/regions/far-shore",
      "/regions/the-lab",
    ]);
    expect(screen.getByText(/VALORANT Ridge is open to explore/)).toBeInTheDocument();
  });
});
