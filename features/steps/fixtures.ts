import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';

type Fixtures = { loginPage: LoginPage; logoutPage: LogoutPage };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
