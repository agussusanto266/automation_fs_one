import {expect} from '@playwright/test';
import {Given, When, Then} from './fixtures';
import { users } from '../../../test-data/users';

Given('user is on the Inventory page', async ({loginPage, inventoryPage}) => {
  await loginPage.open();
  await loginPage.loginAs(users.validUser);
  await inventoryPage.open();
});

When('user remove item from cart', async ({inventoryItemPage}) => {
  await inventoryItemPage.removeFromCart();
});

Then('cart badge should not be displayed', async ({inventoryItemPage}) => {
  const actualBadgeText = await inventoryItemPage.getCartBadgeText();
  expect(actualBadgeText).toBeNull();
});

Then('the button show wording is {string}', async ({inventoryItemPage}, expectedText: string) => {
  const buttonText = await inventoryItemPage.getAddToCartText();
  expect(buttonText).toBe(expectedText);
});