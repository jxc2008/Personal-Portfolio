const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  // e2e/ runs in a real browser with Playwright (npm run test:e2e).
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
});
