import { expect, test } from '@playwright/test';
import { ENTITIES } from '../../lib/constants';
import { waitForDashboardReady } from './helpers';

test('loads the dashboard, switches entity tabs, navigates categories, and shows layer detail', async ({ page }) => {
  await waitForDashboardReady(page);

  for (const entity of ENTITIES) {
    const tab = page.getByTestId(`entity-tab-${entity.id}`);
    await expect(tab).toBeVisible();
    await tab.click();
    await expect(tab).toHaveAttribute('aria-pressed', 'true');
  }

  await page.getByTestId('entity-tab-cg').click();
  await expect(page.getByText('10 AXES STRATÉGIQUES × 10 COUCHES')).toBeVisible();
  await expect(page.getByTestId('category-0')).toContainText(/I ·/i);
  await page.getByTestId('category-0').click();
  await expect(page.getByTestId('layer-cg01')).toBeVisible();
  await page.getByTestId('layer-cg01').click();

  await expect(page.getByTestId('layer-detail')).toBeVisible();
  await expect(page.getByTestId('layer-detail')).toContainText(/SPÉCIFICATION DE COUCHE/i);
  await expect(page.getByTestId('layer-detail')).toContainText(/ID : cg01/i);
});
