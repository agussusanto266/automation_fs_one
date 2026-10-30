import { expect } from '@playwright/test';
import { Given, When, Then } from '../../ui/steps/fixtures';

Given('user open the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When(
  'user login with valid username and valid password',
  async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  },
);

Then('user redirect to dashboard page', async ({ page }) => {
  await expect(page).toHaveURL(/\/inventory\.html/);
});

When('user login with locked user', async ({ loginPage }) => {
  await loginPage.login('locked_out_user', 'secret_sauce');
});

Then('show failed login error message', async ({ loginPage }) => {
  await expect(loginPage.errorMsg).toContainText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});

When(
  'user login with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  },
);

Then(
  'error message {string} is shown',
  async ({ loginPage }, message: string) => {
    await expect(loginPage.errorMsg).toHaveText(message);
  },
);
