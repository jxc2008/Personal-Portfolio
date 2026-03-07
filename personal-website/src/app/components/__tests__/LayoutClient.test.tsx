import { render, screen, act } from "@testing-library/react";
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
  },
}));

// Mock child components to isolate LayoutClient behavior
jest.mock("../Navbar", () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
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

  it("renders Navbar, children, and Footer", () => {
    render(
      <LayoutClient>
        <div data-testid="child">Hello</div>
      </LayoutClient>
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
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

  it("sets cursor to auto on non-homepage routes", () => {
    mockPathname = "/about";
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    expect(document.body.style.cursor).toBe("auto");
  });

  it("passes correct animation props to motion.main", () => {
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    const motionMain = screen.getByTestId("motion-main");
    expect(JSON.parse(motionMain.getAttribute("data-initial")!)).toEqual({ opacity: 0, y: 8 });
    expect(JSON.parse(motionMain.getAttribute("data-animate")!)).toEqual({ opacity: 1, y: 0 });
    expect(JSON.parse(motionMain.getAttribute("data-exit")!)).toEqual({ opacity: 0, y: -8 });
    expect(JSON.parse(motionMain.getAttribute("data-transition")!)).toEqual({ duration: 0.3 });
  });

  it("uses pathname as the motion.main key", () => {
    mockPathname = "/contact";
    render(
      <LayoutClient>
        <div>child</div>
      </LayoutClient>
    );
    const motionMain = screen.getByTestId("motion-main");
    expect(motionMain).toBeInTheDocument();
  });
});
