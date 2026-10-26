import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const DOCS_PORT = 4300;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { trace: "retain-on-failure" },
  projects: [
    {
      name: "playground",
      testIgnore: "docs.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT}` },
    },
    {
      name: "docs",
      testMatch: "docs.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${DOCS_PORT}` },
    },
  ],
  // Everything must be built first (`pnpm build`); both sites are served as built.
  webServer: [
    {
      command: `pnpm --filter playground exec vite preview --port ${PORT} --strictPort`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `node scripts/serve-static.ts apps/docs/out ${DOCS_PORT}`,
      url: `http://localhost:${DOCS_PORT}/docs/`,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
