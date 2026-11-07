import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import { InventoryItemPage } from '../../../pages/InventoryItemPage';

type Fixtures = { loginPage: LoginPage; inventoryPage: InventoryPage; inventoryItemPage: InventoryItemPage };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  }
});

export const { Given, When, Then } = createBdd(test);
