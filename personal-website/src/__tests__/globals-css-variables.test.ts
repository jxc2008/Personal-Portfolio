import fs from "fs";
import path from "path";

const cssPath = path.join(__dirname, "../app/globals.css");
const css = fs.readFileSync(cssPath, "utf8");

describe("globals.css theme variables", () => {
  describe(":root block", () => {
    it("defines --bg", () => {
      expect(css).toMatch(/--bg:\s*#f0f4ff/);
    });
    it("defines --text", () => {
      expect(css).toMatch(/--text:\s*#1a1a2e/);
    });
    it("defines --card-bg", () => {
      expect(css).toMatch(/--card-bg:\s*#ffffff/);
    });
    it("defines --border", () => {
      expect(css).toMatch(/--border:\s*rgba\(0,0,0,0\.1\)/);
    });
    it("defines --accent", () => {
      expect(css).toMatch(/--accent:\s*#6a7fdb/);
    });
  });

  describe('[data-theme="dark"] block', () => {
    it("defines --bg for dark theme", () => {
      expect(css).toMatch(/--bg:\s*#0d0d1a/);
    });
    it("defines --text for dark theme", () => {
      expect(css).toMatch(/--text:\s*#e8eaf6/);
    });
    it("defines --card-bg for dark theme", () => {
      expect(css).toMatch(/--card-bg:\s*#1a1a2e/);
    });
    it("defines --border for dark theme", () => {
      expect(css).toMatch(/--border:\s*rgba\(255,255,255,0\.1\)/);
    });
    it("defines --accent for dark theme", () => {
      expect(css).toMatch(/--accent:\s*#818cf8/);
    });
    it('has [data-theme="dark"] selector', () => {
      expect(css).toMatch(/\[data-theme="dark"\]/);
    });
  });
});
