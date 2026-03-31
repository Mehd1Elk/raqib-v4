import { expect, test } from '@playwright/test';

test('loads /noos/n01', async ({ page }) => {
  await page.goto('/noos/n01');

  await expect(page.getByText(/Psychiatres par ville\/pays/i).first()).toBeVisible();
});

test('loads /cg/cg01 from the current repository dataset', async ({ page }) => {
  await page.goto('/cg/cg01');

  await expect(page.getByText(/Vision & Mission Eigen Group/i).first()).toBeVisible();
});

test('loads /cercle/cd01 from the current repository dataset', async ({ page }) => {
  await page.goto('/cercle/cd01');

  await expect(page.getByText(/Thèse d'investissement Eigen/i).first()).toBeVisible();
});
