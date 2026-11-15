import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/saucedemo/LoginPage';
import { InventoryPage } from '../pages/saucedemo/InventoryPage';
import { InventoryItemPage } from '../pages/saucedemo/InventoryItemPage';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  inventoryItemPage: InventoryItemPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
