import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

Given("User opens the {string} page", async ({ page }, url: string) => {
  await page.goto(url);
});

When(
  "User enters {string} in the {string} field",
  async ({ textBoxPage }, value: string, field: string) => {
    await textBoxPage.fillField(field, value);
  }
);

When("User clicks the {string} button", async ({ page }, name: string) => {
  await page.getByRole("button", { name, exact: true }).click();
});

Then("the output section should be displayed", async ({ textBoxPage }) => {
  await expect(textBoxPage.output).toBeVisible();
});

Then("the output should contain {string}", async ({ textBoxPage }, text: string) => {
  await expect(textBoxPage.output).toContainText(text);
});

Then("the {string} modal should be displayed", async ({ textBoxPage }, title: string) => {
  await expect(textBoxPage.registrationModal).toBeVisible();
  await expect(textBoxPage.modalTitle).toHaveText(title);
});

Then("the {string} modal should be closed", async ({ textBoxPage }, _title: string) => {
  await expect(textBoxPage.registrationModal).toBeHidden();
});

Then(
  "the table should contain a row with {string}, {string}, {string}, {string}, {string}, {string}",
  async (
    { textBoxPage },
    firstName: string,
    lastName: string,
    age: string,
    email: string,
    salary: string,
    department: string
  ) => {
    const row = textBoxPage.getRowByEmail(email);
    await expect(row).toBeVisible();
    await expect(row).toContainText(firstName);
    await expect(row).toContainText(lastName);
    await expect(row).toContainText(age);
    await expect(row).toContainText(email);
    await expect(row).toContainText(salary);
    await expect(row).toContainText(department);
  }
);