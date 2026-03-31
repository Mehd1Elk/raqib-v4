import { expect, test } from '@playwright/test';
import { waitForDashboardReady } from './helpers';

async function openSearchOverlay(page: import('@playwright/test').Page) {
  await waitForDashboardReady(page);

  await page.locator('body').click();
  await page.keyboard.press('Control+k');

  const input = page.getByTestId('search-input');
  if (!(await input.isVisible())) {
    await page.evaluate(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          key: 'k',
          ctrlKey: true,
        }),
      );
    });
  }

  await expect(page.getByTestId('search-overlay')).toBeVisible();
  await expect(input).toBeVisible();
  return input;
}

test('opens Cmd+K search and finds BURHAN plus AlgueSov results', async ({ page }) => {
  const input = await openSearchOverlay(page);

  await input.fill('blockchain');
  await expect(page.getByTestId('search-overlay')).toContainText(/BURHAN/i);

  await input.fill('algue');
  await expect(page.getByTestId('search-overlay')).toContainText(/AlgueSov/i);
});
