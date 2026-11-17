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

  it("opens with the hero, whose scroll cue targets the featured section", () => {
    const hero = screen.getByTestId("hero");
    expect(hero).toHaveAttribute("data-next", "featured");
    expect(document.getElementById("featured")).toBeInTheDocument();
  });

  it("keeps the explore links below the hero", () => {
    expect(screen.getByRole("link", { name: /professional/i })).toHaveAttribute("href", "/professional");
    expect(screen.getByRole("link", { name: /personal/i })).toHaveAttribute("href", "/nonprofessional");
  });
});
