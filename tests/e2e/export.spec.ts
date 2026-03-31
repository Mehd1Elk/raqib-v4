import { expect, test } from '@playwright/test';
import { waitForDashboardReady } from './helpers';

test('exports a CSV file named RAQIB_*.csv', async ({ page }) => {
  await waitForDashboardReady(page);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('export-button').click(),
  ]);

  await expect(download.suggestedFilename()).toMatch(/^RAQIB_.*\.csv$/);
});
