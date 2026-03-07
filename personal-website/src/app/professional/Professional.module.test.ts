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
