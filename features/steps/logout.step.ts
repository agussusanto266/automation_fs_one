import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

When('user logout', async ({ logoutPage }) => {
  await logoutPage.logout();
});

Then('user redirect to home login page', async ({ page }) => {
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Swag Labs');
});
