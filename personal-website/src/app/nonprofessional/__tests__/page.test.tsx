import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NonProfessional from "../page";

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
jest.mock("../../components/Navigation", () => () => null);
jest.mock("../../components/SocialMediaLinks", () => () => null);
jest.mock("../../components/Footer", () => {
  const MockFooter = () => <footer data-testid="footer">Footer</footer>;
  MockFooter.displayName = "Footer";
  return MockFooter;
});
jest.mock("react-icons/fa", () => ({
  FaMusic: () => <span data-testid="fa-music" />,
  FaCompactDisc: () => <span data-testid="fa-compact-disc" />,
}));

describe("NonProfessional page", () => {
  beforeEach(() => {
    render(<NonProfessional />);
  });

  // Hero section
  it("renders the hero heading", () => {
    expect(screen.getByRole("heading", { name: /personal passions/i })).toBeInTheDocument();
  });

  it("renders the hero tagline", () => {
    expect(screen.getByText(/beyond the code/i)).toBeInTheDocument();
  });

  it("renders a mailto contact link", () => {
    const link = screen.getByRole("link", { name: /contact me/i });
    expect(link).toHaveAttribute("href", "mailto:joseph.x.cheng@gmail.com");
  });

  it("does not render a button for contact", () => {
    const buttons = screen.queryAllByRole("button", { name: /contact me/i });
    expect(buttons).toHaveLength(0);
  });

  it("renders the scroll-down arrow", () => {
    expect(screen.getByLabelText(/scroll down/i)).toBeInTheDocument();
  });

  // Writing section
  it("renders the Writing & Ideas heading", () => {
    expect(screen.getByRole("heading", { name: /writing & ideas/i })).toBeInTheDocument();
  });

  it("renders the writing subtitle", () => {
    expect(screen.getByText(/essays, reflections, and ideas/i)).toBeInTheDocument();
  });

  it("renders 3 writing cards with category chips", () => {
    expect(screen.getByText("Essay")).toBeInTheDocument();
    expect(screen.getByText("Reflection")).toBeInTheDocument();
    expect(screen.getByText("Ideas")).toBeInTheDocument();
  });

  it("renders placeholder titles in writing cards", () => {
    const titles = screen.getAllByText("Coming Soon");
    expect(titles).toHaveLength(3);
  });

  it("renders greyed-out Read links", () => {
    const readLinks = screen.getAllByText(/Read →/);
    expect(readLinks).toHaveLength(3);
    readLinks.forEach((el) => {
      expect(el.tagName).toBe("SPAN");
    });
  });

  // Music section
  it("renders the Music heading", () => {
    expect(screen.getByRole("heading", { name: /^music$/i })).toBeInTheDocument();
  });

  it("renders the music subtitle", () => {
    expect(screen.getByText(/things i play when i'm not writing code/i)).toBeInTheDocument();
  });

  it("renders 3 music cards", () => {
    expect(screen.getByText("Classical Pieces")).toBeInTheDocument();
    expect(screen.getByText("Original Compositions")).toBeInTheDocument();
    expect(screen.getByText("Covers & Transcriptions")).toBeInTheDocument();
  });

  it("renders music icons", () => {
    const musicIcons = screen.getAllByTestId("fa-music");
    expect(musicIcons).toHaveLength(2);
    expect(screen.getByTestId("fa-compact-disc")).toBeInTheDocument();
  });

  // Footer section
  it("renders a Back to Home link (not button)", () => {
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toHaveAttribute("href", "/");
    expect(link.tagName).toBe("A");
  });

  it("renders the Footer component", () => {
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  // Section ordering
  it("renders sections in correct order", () => {
    const { container } = render(<NonProfessional />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);

    expect(sections[0].id).toBe("home");
    expect(sections[1].id).toBe("writingSection");
    expect(sections[2].id).toBe("musicSection");
  });
});
