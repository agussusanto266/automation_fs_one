import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/orangehrm/LoginPage';
import { PimPage } from '../pages/orangehrm/PimPage';

type Fixtures = {
  loginPage: LoginPage;
  pimPage: PimPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
