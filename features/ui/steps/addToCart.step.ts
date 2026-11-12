import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

Given ('user is on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When ('user go to inventory item page', async ({ inventoryPage, inventoryItemPage }) => {
  await inventoryPage.openInventoryItem('Sauce Labs Backpack');
  expect(await inventoryItemPage.getInventoryItemText('Sauce Labs Backpack')).toBe('Sauce Labs Backpack');
});

When ('user add item to cart', async ({ inventoryItemPage }) => {
  await inventoryItemPage.addToCart();
});

Then ('cart badge should display {string}', async ({ inventoryItemPage }, expectedBadgeText: string) => {
  const actualBadgeText = await inventoryItemPage.getCartBadgeText();
  expect(actualBadgeText).toBe(expectedBadgeText);
});