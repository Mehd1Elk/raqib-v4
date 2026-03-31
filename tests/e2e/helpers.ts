import { expect, type Page } from '@playwright/test';

export async function waitForDashboardReady(page: Page) {
  page.on('pageerror', (error) => {
    console.error(`PAGEERROR: ${error.message}`);
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(`BROWSER_CONSOLE: ${message.text()}`);
    }
  });
  await page.goto('/');
  await expect(page.getByText(/V4 · 1000 COUCHES · 9 PLATEFORMES/i)).toBeVisible();
  await expect
    .poll(async () => page.locator('body').textContent(), { timeout: 15000 })
    .toMatch(/\d{2}:\d{2}:\d{2}/);
}
