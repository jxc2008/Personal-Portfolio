import { defineConfig } from "@playwright/test";

// Browser checks that need real layout (jsdom has none). Runs against a
// production build: npm run build && npm run test:e2e
const PORT = 3123;

export default defineConfig({
  testDir: "e2e",
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
