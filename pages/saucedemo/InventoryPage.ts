import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly logoutBtn: Locator;
  readonly burgerBtn: Locator;
  readonly inventoryItem: Locator;

  constructor(private page: Page) {
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
    this.burgerBtn = page.locator('[id="react-burger-menu-btn"]');
    this.inventoryItem = page.locator('[data-test="inventory-item-name"]');
  }

  async open() {
    await this.page.goto('/inventory.html');
  }

  async logout() {
    await this.burgerBtn.click();
    await this.logoutBtn.click();
  }

  async getInventoryItemText(itemName: string) {
    const item = this.inventoryItem.filter({ hasText: itemName });
    return await item.textContent();
  }

  async openInventoryItem(itemName: string) {
    const item = this.inventoryItem.filter({ hasText: itemName });
    await item.click();
  } 
}
