import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock next/navigation
let mockPathname = "/about";
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    main: ({
      children,
      initial,
      animate,
      exit,
      transition,
      ...props
    }: any) => (
      <main
        data-testid="motion-main"
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-exit={JSON.stringify(exit)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </main>
    ),
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

// Mock child components to isolate LayoutClient behavior
jest.mock("../FloatingPillNav", () => {
  return function MockFloatingPillNav() {
    return <nav data-testid="floating-pill-nav">FloatingPillNav</nav>;
  };
});

jest.mock("../GlowCursor", () => {
  return function MockGlowCursor() {
    return <div data-testid="glow-cursor" />;
  };
});

jest.mock("../Footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

import LayoutClient from "../LayoutClient";

describe("LayoutClient", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    mockPathname = "/about";
  });

  it("renders FloatingPillNav, children, and Footer", () => {
    render(
      <LayoutClient>
        <div data-testid="child">Hello</div>
      </LayoutClient>
    );
    expect(screen.getByTestId("floating-pill-nav")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("sets data-theme to light by default", () => {
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("sets data-theme to dark when localStorage theme is dark", () => {
    localStorage.setItem("theme", "dark");
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("wraps children in a motion.main element", () => {
    render(
      <LayoutClient>
        <div data-testid="child">content</div>
      </LayoutClient>
    );
    const child = screen.getByTestId("child");
    expect(child.closest("main")).not.toBeNull();
    expect(screen.getByTestId("motion-main")).toBeInTheDocument();
  });

  it("renders GlowCursor component", () => {
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    expect(screen.getByTestId("glow-cursor")).toBeInTheDocument();
  });
});
