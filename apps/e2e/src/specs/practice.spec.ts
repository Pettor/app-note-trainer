import { expect, test } from "../fixtures";

// Injected before page load so Jotai's atomWithStorage picks up the overridden settings.
// timerEnabled must be true so the per-note countdown runs; the actual duration is
// overridden to 1 s by VITE_E2E_MODE inside UseGameLoop, so the timeout test finishes fast.
// sharps:false keeps notes natural to match the E2E_NOTE_QUEUE in NotePool.ts.
const E2E_SETTINGS = {
  difficulty: "custom",
  staff: "treble",
  noteRange: "narrow",
  ledgerLines: false,
  ledgerDepth: 1,
  sharps: false,
  timerEnabled: true,
  duration: 8,
  guessScaleFirst: false,
};

test.describe("practice session → score", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((settings) => {
      localStorage.setItem("practice-settings", JSON.stringify(settings));
    }, E2E_SETTINGS);

    await page.goto("/#/home");
    await expect(page.getByRole("button", { name: "Start training session" })).toBeVisible();
  });

  test("plays 3 notes (correct / wrong / timeout) and shows expected score", async ({ page }) => {
    await page.getByRole("button", { name: "Start training session" }).click();

    // Wait for the 3-second countdown to expire and the "playing" phase to start.
    await expect(page.getByText("Identify the note")).toBeVisible({ timeout: 10000 });

    // --- Note 1: C4 — press the correct key ---
    const c4 = page.getByTestId("piano-keyboard__key-c4");
    await expect(c4).toBeVisible();
    await c4.click();

    // --- Note 2: E4 — press D4 (wrong answer) ---
    const d4 = page.getByTestId("piano-keyboard__key-d4");
    await expect(d4).toBeVisible();
    await d4.click();

    // --- Note 3: G4 — let the timer expire ---
    // VITE_E2E_MODE overrides the per-note duration to 1 s; 1.5 s gives the tick
    // loop enough headroom to dispatch NOTE_TIMEOUT without padding the test further.
    await page.waitForTimeout(1500);

    // Game should have finished and navigated to the score view.
    await expect(page).toHaveURL(/#\/score/, { timeout: 5000 });

    // Heading for a non-perfect run
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Nice work");

    // Hero card subtitle: "You got 1 of 3 notes."
    await expect(page.getByText(/1 of 3/)).toBeVisible();

    // Misses stat tile label (exact match avoids matching "misses" in the hero subtitle)
    await expect(page.getByText("Misses", { exact: true })).toBeVisible();

    // Miss list with count and entries
    await expect(page.getByText("Missed notes")).toBeVisible();

    // Miss 1: wrong answer — played D instead of E
    await expect(page.getByText("Shown E")).toBeVisible();
    await expect(page.getByText(/You played/)).toBeVisible();

    // Miss 2: timed out on G
    await expect(page.getByText("Shown G")).toBeVisible();
    await expect(page.getByText("Timed out")).toBeVisible();
  });
});
