import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When('user logout', async ({ inventoryPage }) => {
  await inventoryPage.logout();
});

Then('user redirect to home login page', async ({ page }) => {
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Swag Labs');
});
