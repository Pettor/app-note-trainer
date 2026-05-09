import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  testMatch: "**/generate-screenshots.spec.ts",
  reporter: "list",
  use: {
    baseURL: "http://localhost:9050",
  },
  webServer: {
    command: "pnpm -w run storybook:nopen",
    url: "http://localhost:9050",
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
