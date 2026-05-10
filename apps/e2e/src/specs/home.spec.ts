import { expect, test } from "../fixtures";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/home");
    await expect(async () => {
      expect(await page.title()).toBe("Note Trainer");
    }).toPass();
  });

  test("renders hero heading and tagline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Tune your")).toBeVisible();
    await expect(page.getByText("note reading")).toBeVisible();
  });

  test("renders session setup card with all settings", async ({ page }) => {
    await expect(page.getByText("Session setup")).toBeVisible();
    await expect(page.getByText("Difficulty", { exact: true })).toBeVisible();
    await expect(page.getByText("Staff", { exact: true })).toBeVisible();
    await expect(page.getByText("Sharps & flats")).toBeVisible();
    await expect(page.getByText("Time limit")).toBeVisible();
  });

  test("renders start training button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Start training session" })).toBeVisible();
  });

  test("renders footer with github and linkedin links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  });
});
