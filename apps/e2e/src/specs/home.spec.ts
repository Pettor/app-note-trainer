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
    await expect(page.getByText("Master every note.")).toBeVisible();
  });

  test("renders all feature chips", async ({ page }) => {
    await expect(page.getByText("Note Recognition")).toBeVisible();
    await expect(page.getByText("Interval Training")).toBeVisible();
    await expect(page.getByText("Theory Fundamentals")).toBeVisible();
    await expect(page.getByText("Spaced Repetition")).toBeVisible();
    await expect(page.getByText("Works Offline")).toBeVisible();
  });

  test("renders start practicing button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Start Practicing" })).toBeVisible();
  });

  test("renders footer with github and linkedin links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  });
});
