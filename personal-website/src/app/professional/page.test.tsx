import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Professional from "./page";

jest.mock("../components/ThreeBodySimulation", () => () => null);
jest.mock("../components/Navigation", () => () => null);
jest.mock("../components/SocialMediaLinks", () => () => null);
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe("Professional page - skills section", () => {
  it("renders the Skills heading", () => {
    render(<Professional />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders all skill categories", () => {
    render(<Professional />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("ML & Data")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders all skill tags", () => {
    render(<Professional />);
    const expectedSkills = [
      "Python", "TypeScript", "JavaScript", "C++", "Java",
      "React", "Next.js", "Node.js",
      "PyTorch", "NumPy", "Pandas", "SQL",
      "Git", "LaTeX", "Figma", "Linux",
    ];
    for (const skill of expectedSkills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
  });

  it("renders skills section before projects section", () => {
    const { container } = render(<Professional />);
    const sections = container.querySelectorAll("section");
    const sectionIds = Array.from(sections).map((s) => s.id || s.className);
    const skillsIndex = sectionIds.findIndex((id) => id.includes("skillsSection"));
    const projectsIndex = sectionIds.findIndex((id) => id === "projectsSection");
    expect(skillsIndex).toBeGreaterThan(-1);
    expect(projectsIndex).toBeGreaterThan(-1);
    expect(skillsIndex).toBeLessThan(projectsIndex);
  });
});

describe("Professional page - resume download button", () => {
  it("renders the Download Resume link", () => {
    render(<Professional />);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toBeInTheDocument();
  });

  it("has href pointing to /resume.pdf", () => {
    render(<Professional />);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", "/resume.pdf");
  });

  it("has the download attribute", () => {
    render(<Professional />);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("download");
  });

  it("renders both Contact Me button and Download Resume link", () => {
    render(<Professional />);
    expect(screen.getByRole("button", { name: /contact me/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download resume/i })).toBeInTheDocument();
  });
});
