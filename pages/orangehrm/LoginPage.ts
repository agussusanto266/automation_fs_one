import { Locator, Page } from '@playwright/test';
import { User } from '../../test-data/orangehrm/users';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(private page: Page) {
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(user: User) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginBtn.click();
  }
}
