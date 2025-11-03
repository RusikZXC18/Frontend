import { test, expect } from '@playwright/test';

test('Full app workflow', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await expect(page.getByText('My Angular App')).toBeVisible();

  const searchBox = page.getByPlaceholder('Пошук проєкту...');
  await searchBox.fill('Angular');
  await page.getByText('Додати новий').click();

  await expect(page).toHaveURL(/items\/new/);
});
