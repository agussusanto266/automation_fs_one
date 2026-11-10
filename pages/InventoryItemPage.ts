import { Locator, Page } from '@playwright/test';

export class InventoryItemPage {
  readonly inventoryItem: Locator;
  readonly addToCartBtn: Locator;
  readonly cartBadge: Locator;

  constructor(private page: Page) {
    this.inventoryItem = page.locator('[data-test="inventory-item-name"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getInventoryItemText(itemName: string) {
    const item = this.inventoryItem.filter({ hasText: itemName });
    return await item.textContent();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async getCartBadgeText() {
    return await this.cartBadge.textContent();
  }
}
