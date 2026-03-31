import { expect, test } from '@playwright/test';
import { ENTITIES } from '../../lib/constants';

test('loads the dashboard, switches entity tabs, navigates categories, and shows layer detail', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText(/V4 · 1000 COUCHES · 9 PLATEFORMES/i)).toBeVisible();

  for (const entity of ENTITIES) {
    await page.getByRole('button', { name: new RegExp(entity.name, 'i') }).first().click();
  }

  await page.getByRole('button', { name: /CG SA/i }).first().click();
  await expect(page.getByText('10 AXES STRATÉGIQUES × 10 COUCHES')).toBeVisible();

  await page.getByRole('button', { name: /I · AXES STRATÉGIQUES CORPORATE/i }).click();
  await page.getByRole('button', { name: /Vision & Mission Eigen Group/i }).click();

  await expect(page.getByText(/SPÉCIFICATION DE COUCHE/i)).toBeVisible();
  await expect(page.getByText(/Vision & Mission Eigen Group/i).first()).toBeVisible();
});
