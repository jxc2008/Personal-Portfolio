import fs from "fs";
import path from "path";

const cssPath = path.join(__dirname, "Professional.module.css");
const css = fs.readFileSync(cssPath, "utf8");

describe("Professional.module.css uses CSS custom properties for theming", () => {
  it("does not contain hardcoded dark background colors (#1a1a2e, #0d0d1a, #2a2a3e)", () => {
    expect(css).not.toMatch(/#1a1a2e/);
    expect(css).not.toMatch(/#0d0d1a/);
    expect(css).not.toMatch(/#2a2a3e/);
  });

  it("does not contain hardcoded light text colors (#e8eaf6, #ffffff as text color)", () => {
    // #ffffff may appear in button text (color: white) which is fine,
    // but should not appear as a standalone hex text color
    expect(css).not.toMatch(/#e8eaf6/);
  });

  it("does not contain hardcoded dark text colors (#1f2937, #555555, #777777)", () => {
    expect(css).not.toMatch(/#1f2937/);
    expect(css).not.toMatch(/#555555/);
    expect(css).not.toMatch(/#777777/);
  });

  it("uses var(--bg) for background properties", () => {
    expect(css).toMatch(/background:\s*var\(--bg\)/);
  });

  it("uses var(--card-bg) for card backgrounds", () => {
    expect(css).toMatch(/background:\s*var\(--card-bg\)/);
  });

  it("uses var(--text) for text colors", () => {
    expect(css).toMatch(/color:\s*var\(--text\)/);
  });

  it("uses var(--border) for border colors", () => {
    expect(css).toMatch(/var\(--border\)/);
  });
});

describe("Professional.module.css - skills section styles", () => {
  it("defines .skillsSection with correct padding and max-width", () => {
    expect(css).toMatch(/\.skillsSection\s*\{[^}]*padding:\s*4rem\s+2rem/);
    expect(css).toMatch(/\.skillsSection\s*\{[^}]*max-width:\s*1200px/);
  });

  it("defines .skillGroup with flex layout", () => {
    expect(css).toMatch(/\.skillGroup\s*\{[^}]*display:\s*flex/);
  });

  it("defines .skillTag with pill shape (border-radius: 999px)", () => {
    expect(css).toMatch(/\.skillTag\s*\{[^}]*border-radius:\s*999px/);
  });

  it("defines .skillTag hover using var(--accent)", () => {
    expect(css).toMatch(/\.skillTag:hover\s*\{[^}]*background:\s*var\(--accent\)/);
  });

  it("uses var(--text) for skillCategory color", () => {
    expect(css).toMatch(/\.skillCategory\s*\{[^}]*color:\s*var\(--text\)/);
  });
});

describe("Professional.module.css - mobile responsive styles (max-width: 768px)", () => {
  const mediaBlockMatch = css.match(/@media\s*\(\s*max-width:\s*768px\s*\)\s*\{([\s\S]*)\}\s*$/);
  const mediaContent = mediaBlockMatch ? mediaBlockMatch[1] : "";

  it("has a @media (max-width: 768px) block", () => {
    expect(mediaBlockMatch).not.toBeNull();
  });

  it("sets .header font-size to 2.5rem", () => {
    expect(mediaContent).toMatch(/\.header\s*\{[^}]*font-size:\s*2\.5rem/);
  });

  it("sets .projectTitle font-size to 1.5rem", () => {
    expect(mediaContent).toMatch(/\.projectTitle\s*\{[^}]*font-size:\s*1\.5rem/);
  });

  it("sets .projectsTitle font-size to 2rem", () => {
    expect(mediaContent).toMatch(/\.projectsTitle\s*\{[^}]*font-size:\s*2rem/);
  });

  it("sets .skillsSection padding to 2rem 1rem", () => {
    expect(mediaContent).toMatch(/\.skillsSection\s*\{[^}]*padding:\s*2rem\s+1rem/);
  });
});
