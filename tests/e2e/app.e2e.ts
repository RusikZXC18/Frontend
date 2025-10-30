import { test, expect } from '@playwright/test';

test('Відображення списку проєктів', async ({ page }) => {
  await page.goto('/items');

  await expect(page).toHaveTitle(/Angular/i);

  const cards = page.locator('app-item-card');
  await expect(cards.first()).toBeVisible();
});
