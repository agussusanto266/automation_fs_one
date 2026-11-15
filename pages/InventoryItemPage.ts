import { Locator, Page } from '@playwright/test';

export class InventoryItemPage {
  readonly inventoryItem: Locator;
  readonly addToCartBtn: Locator;
  readonly cartBadge: Locator;
  readonly removeFromCartBtn: Locator;

  constructor(private page: Page) {
    this.inventoryItem = page.locator('[data-test="inventory-item-name"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.removeFromCartBtn = page.locator('[data-test="remove"]');
  }

  async getInventoryItemText(itemName: string) {
    const item = this.inventoryItem.filter({ hasText: itemName });
    return await item.textContent();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async getCartBadgeText() {
    if (await this.cartBadge.count() === 0) {
      return null;
    }
    return await this.cartBadge.textContent();
  }
  
  async removeFromCart() {
    await this.removeFromCartBtn.click();
  } 

  async getAddToCartText() {
    return await this.addToCartBtn.textContent();
  }
}
