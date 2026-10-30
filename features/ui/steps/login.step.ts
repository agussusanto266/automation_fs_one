import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';
import { users } from '../../../test-data/users';

Given('user open the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When(
  'user login with valid username and valid password',
  async ({ loginPage }) => {
    await loginPage.loginAs(users.validUser);
  },
);

Then('user redirect to dashboard page', async ({ page }) => {
  await expect(page).toHaveURL(/\/inventory\.html/);
});

When('user login with locked user', async ({ loginPage }) => {
  await loginPage.loginAs(users.lockedOutUser);
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
