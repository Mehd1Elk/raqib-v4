import { expect, test } from '@playwright/test';

test('opens Cmd+K search and finds BURHAN plus AlgueSov results', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        ctrlKey: true,
        key: 'k',
      }),
    );
  });
  await expect(page.getByPlaceholder('Rechercher parmi 1000 couches...')).toBeVisible();

  const input = page.getByPlaceholder('Rechercher parmi 1000 couches...');

  await input.fill('blockchain');
  await expect(page.getByText(/BURHAN/i).first()).toBeVisible();

  await input.fill('algue');
  await expect(page.getByText(/AlgueSov/i).first()).toBeVisible();
});
