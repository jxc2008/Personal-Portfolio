import fs from "fs";
import path from "path";

const cssPath = path.join(__dirname, "..", "page.module.css");
const css = fs.readFileSync(cssPath, "utf8");

describe("page.module.css mobile responsiveness", () => {
  it("contains a @media (max-width: 768px) block", () => {
    expect(css).toMatch(/@media\s*\(\s*max-width:\s*768px\s*\)/);
  });

  it("sets .name font-size to 3.5rem in mobile breakpoint", () => {
    const mediaBlock = css.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{([\s\S]*?)\n\}/
    );
    expect(mediaBlock).not.toBeNull();
    const inner = mediaBlock![1];
    expect(inner).toMatch(/\.name\s*\{[^}]*font-size:\s*3\.5rem/);
  });

  it("sets .im font-size to 2rem in mobile breakpoint", () => {
    const mediaBlock = css.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{([\s\S]*?)\n\}/
    );
    expect(mediaBlock).not.toBeNull();
    const inner = mediaBlock![1];
    expect(inner).toMatch(/\.im\s*\{[^}]*font-size:\s*2rem/);
  });
});
