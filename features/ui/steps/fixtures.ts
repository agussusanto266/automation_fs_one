import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';

type Fixtures = { loginPage: LoginPage; inventoryPage: InventoryPage };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
