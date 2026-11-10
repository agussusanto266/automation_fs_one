import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { PimPage } from '../../../pages/PimPage';

const { Given, When, Then } = createBdd();

let pimPage: PimPage;

Given('user navigates to OrangeHRM login page', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  pimPage = new PimPage(page);
});

Given('user logs in with username {string} and password {string}', async ({ page }, username: string, pass: string) => {
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(pass);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard/**');
});

Given('user navigates to {string} module', async ({}, moduleName: string) => {
  await pimPage.navigateToPim();
});

When('user opens "Add Employee" tab', async () => {
  await pimPage.goToAddEmployee();
});

When('user creates employee with firstName {string} and lastName {string}', async ({}, first: string, last: string) => {
  await pimPage.fillEmployeeForm(first, last);
});

Then('employee profile header should display {string}', async ({}, fullName: string) => {
  await expect(pimPage.profileHeader).toContainText(fullName, { timeout: 15000 });
});

When('user clicks save button directly', async () => {
  await pimPage.clickSaveOnly();
});

Then('required field validation errors should appear', async () => {
  await expect(pimPage.errorMessages.first()).toBeVisible();
});

When('user opens "Employee List" tab', async () => {
  await pimPage.goToEmployeeList();
});

When('user searches employee by name {string}', async ({}, name: string) => {
  await pimPage.searchEmployee(name);
});

Then('employee table should display matching records', async () => {
  await expect(pimPage.tableRows.first()).toBeVisible({ timeout: 10000 });
});

Then('table should display {string}', async ({}, message: string) => {
  await expect(pimPage.noRecordsLabel).toBeVisible({ timeout: 10000 });
});

When('user clicks edit on the first record', async () => {
  await pimPage.clickEditFirstRecord();
});

When('user updates middle name to {string} and saves', async ({}, middle: string) => {
  await pimPage.updateMiddleName(middle);
});

When('user deletes the first record', async () => {
  await pimPage.deleteFirstRecord();
});

Then('success toast notification should appear', async () => {
  await expect(pimPage.toastSuccess).toBeVisible({ timeout: 10000 });
});