import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly logoutBtn: Locator;
  readonly burgetBtn: Locator;

  constructor(private page: Page) {
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
    this.burgetBtn = page.locator('[id="react-burger-menu-btn"]');
  }

  async logout() {
    await this.burgetBtn.click();
    await this.page.waitForTimeout(3000);
    await this.logoutBtn.click();
  }
}
