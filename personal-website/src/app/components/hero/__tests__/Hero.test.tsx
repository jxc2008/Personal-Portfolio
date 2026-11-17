import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockEngine = jest.fn();
jest.mock("../HeroEngine", () => ({
  HeroEngine: jest.fn().mockImplementation((opts) => {
    mockEngine(opts);
    return { dispose: jest.fn() };
  }),
}));

import Hero from "../Hero";

function mockMatchMedia(reduced: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("reduce") ? reduced : false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

describe("Hero", () => {
  beforeEach(() => {
    mockEngine.mockClear();
    window.history.replaceState(null, "", "/?tod=golden");
  });

  it("renders the title, subtitle and a scroll cue to the next section", () => {
    mockMatchMedia(false);
    render(<Hero nextId="featured" />);
    expect(screen.getByRole("heading", { level: 1, name: "Joseph Cheng" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Scroll to content" })).toHaveAttribute("href", "#featured");
  });

  it("shows the static image for the current time of day with meaningful alt text", () => {
    mockMatchMedia(false);
    const { container } = render(<Hero nextId="featured" />);
    const img = container.querySelector("img#hero-static")!;
    expect(img).toHaveAttribute("src", "/hero/hero-golden.webp");
    expect(img.getAttribute("alt")).toMatch(/golden sun/);
    expect(container.querySelector("section")).toHaveAttribute("data-tod", "golden");
  });

  it("starts the WebGL engine when motion is allowed", () => {
    mockMatchMedia(false);
    render(<Hero nextId="featured" />);
    expect(mockEngine).toHaveBeenCalledTimes(1);
    expect(mockEngine.mock.calls[0][0].todOverride).toBe("golden");
  });

  it("stays static under prefers-reduced-motion", () => {
    mockMatchMedia(true);
    render(<Hero nextId="featured" />);
    expect(mockEngine).not.toHaveBeenCalled();
  });

  it("hides the decorative canvases from assistive tech", () => {
    mockMatchMedia(false);
    const { container } = render(<Hero nextId="featured" />);
    container.querySelectorAll("canvas").forEach((c) => expect(c).toHaveAttribute("aria-hidden", "true"));
  });
});
