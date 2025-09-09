import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Borrower selection updates detail panel', async ({ page }) => {
    await page.click('text=Sarah Dunn');

    await expect(page.locator('h2')).toHaveText('Sarah Dunn');
  });

  test('Explainability section renders AI flags', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await expect(page.locator('text=High Debt-to-Income Ratio')).toBeVisible();
  });

  test('Request Documents button opens modal', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.click('button:has-text("Request Documents")');

    await expect(page.locator('text=Documents requested.')).toBeVisible();
  });

  test('Escalate to Credit Committee works', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.click('button:has-text("Escalate to Credit Committee")');

    await expect(page.locator('text=Escalated to Credit Committee.')).toBeVisible();
  });

  test('Responsive layout works (mobile view)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); 
    await page.reload();

    await expect(page.locator('text=Broker Info')).toBeVisible();
  });
});
