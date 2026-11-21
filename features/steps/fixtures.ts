import { test as base, createBdd } from "playwright-bdd";
import { LoginPage } from "../../pages/LoginPage";
import { LogoutPage } from "../../pages/LogoutPage";
import { TextBoxPage } from "../../pages/TextBoxPage";

type Fixtures = {
  loginPage: LoginPage;
  logoutPage: LogoutPage;
  textBoxPage: TextBoxPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);