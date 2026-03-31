import { expect, test } from '@playwright/test';

test('exports a CSV file named RAQIB_*.csv', async ({ page }) => {
  await page.goto('/');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /EXPORT CSV/i }).click(),
  ]);

  expect(download.suggestedFilename()).toMatch(/^RAQIB_.*\.csv$/);
});
