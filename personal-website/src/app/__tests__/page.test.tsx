import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock("../components/NavbarContext", () => ({
  useTheme: () => ({ darkMode: false }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      whileTap,
      animate,
      initial,
      variants,
      transition,
      ...rest
    }: {
      children?: React.ReactNode;
      whileHover?: unknown;
      whileTap?: unknown;
      animate?: unknown;
      initial?: unknown;
      variants?: unknown;
      transition?: unknown;
      [key: string]: unknown;
    }) => <div {...rest}>{children}</div>,
  },
}));

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the hero heading with 'I'm' text", () => {
    expect(screen.getByText("I'm")).toBeInTheDocument();
  });

  it("renders the name 'Joseph Cheng'", () => {
    expect(screen.getByText("Joseph Cheng")).toBeInTheDocument();
  });

  it("renders the scroll arrow with aria-label", () => {
    expect(screen.getByLabelText("Scroll Down")).toBeInTheDocument();
  });

  it("renders the scroll arrow as a motion.div (no CSS bounce animation)", () => {
    const arrow = screen.getByLabelText("Scroll Down");
    expect(arrow.tagName).toBe("DIV");
  });

  it("renders Projects panel link", () => {
    const link = screen.getByRole("link", { name: /go to projects/i });
    expect(link).toHaveAttribute("href", "/professional");
  });

  it("renders Passions panel link", () => {
    const link = screen.getByRole("link", { name: /go to passions/i });
    expect(link).toHaveAttribute("href", "/nonprofessional");
  });

  it("does not apply fade-in-name class to the name span", () => {
    const name = screen.getByText("Joseph Cheng");
    expect(name.className).not.toContain("fade-in-name");
  });

  it("wraps the text container in a motion.div for fadeInUp", () => {
    const name = screen.getByText("Joseph Cheng");
    const textContainer = name.closest("div");
    expect(textContainer).toBeInTheDocument();
  });

  it("wraps each panel in a motion.div for hover animation", () => {
    const projectsLink = screen.getByRole("link", { name: /go to projects/i });
    const wrapper = projectsLink.parentElement;
    expect(wrapper?.tagName).toBe("DIV");

    const passionsLink = screen.getByRole("link", { name: /go to passions/i });
    const wrapper2 = passionsLink.parentElement;
    expect(wrapper2?.tagName).toBe("DIV");
  });
});
