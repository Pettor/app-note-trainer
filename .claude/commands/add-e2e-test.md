# Add E2E Test

Add a new end-to-end test using Playwright.

## Input

$ARGUMENTS

## Requirements

### Test Structure

E2E tests are located in `apps/e2e/src/specs/`. Follow the existing pattern:

```typescript
import { expect, test } from "../fixtures";

test.describe("<feature-name>.<scenario>", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/<route>");
    await expect(async () => {
      expect(await page.title()).toBe("Expected Title");
    }).toPass();
  });

  test("<description of what is being tested>", async ({ page }) => {
    // Interact with elements using role or testid selectors
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("button", { name: "Submit" }).click();

    // Use async assertions with .toPass() for navigation/state changes
    await expect(async () => {
      expect(await page.title()).toBe("New Title");
    }).toPass();
  });
});
```

### Key Patterns

- **Selectors**: Prefer `page.getByRole(...)` and `page.getByText(...)` for semantic queries; fall back to `page.getByTestId("component__element")` when roles are ambiguous
- **Assertions**: Wrap navigation/async state assertions in `await expect(async () => { ... }).toPass()`
- **Base URL**: Tests run against `https://localhost:5173` with hash-based routing (`#/`)
- **File naming**: `<feature>.spec.ts` in `apps/e2e/src/specs/`
- **Fixtures**: Always import `test` and `expect` from `"../fixtures"` (not directly from `@playwright/test`)

### After Creating Tests

1. Run `pnpm lint:fix` to ensure code quality
2. Run the specific test: `pnpm test:e2e` or target a file with `pnpm --filter=@app/e2e exec playwright test src/specs/<file>.spec.ts`

## Checklist

- [ ] Created test spec file in `apps/e2e/src/specs/`
- [ ] Imported `test` and `expect` from `"../fixtures"`
- [ ] Used semantic role selectors where possible
- [ ] Used `.toPass()` wrapper for async navigation assertions
- [ ] Ran `pnpm lint:fix`
- [ ] Verified tests pass with `pnpm test:e2e`
