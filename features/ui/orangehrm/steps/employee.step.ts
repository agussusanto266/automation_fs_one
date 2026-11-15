import { expect } from '@playwright/test';
import { Given, When, Then } from '../../../../fixtures/orangehrm.fixtures';
import { users } from '../../../../test-data/orangehrm/users';

Given('user open the login orangeHRM page', async ({ loginPage }) => {
  await loginPage.open();
});

Given(
  'user login with valid username and valid password in orangeHRM',
  async ({ loginPage }) => {
    await loginPage.login(users.validUser);
  },
);

Then('user redirect to dashboard orangeHRM page', async ({ page }) => {
  await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
});

Given(
  'user navigates to {string} module',
  async ({ pimPage }, moduleName: string) => {
    await pimPage.navigateToPim();
  },
);

When('user opens "Add Employee" tab', async ({ pimPage }) => {
  await pimPage.goToAddEmployee();
});

When(
  'user creates employee with firstName {string} and lastName {string}',
  async ({ pimPage }, first: string, last: string) => {
    await pimPage.fillEmployeeForm(first, last);
  },
);

Then(
  'employee profile header should display {string}',
  async ({ pimPage }, fullName: string) => {
    await expect(pimPage.profileHeader).toContainText(fullName, {
      timeout: 15000,
    });
  },
);

When('user clicks save button directly', async ({ pimPage }) => {
  await pimPage.clickSaveOnly();
});

Then('required field validation errors should appear', async ({ pimPage }) => {
  await expect(pimPage.errorMessages.first()).toBeVisible();
});

When('user opens "Employee List" tab', async ({ pimPage }) => {
  await pimPage.goToEmployeeList();
});

When(
  'user searches employee by name {string}',
  async ({ pimPage }, name: string) => {
    await pimPage.searchEmployee(name);
  },
);

Then('employee table should display matching records', async ({ pimPage }) => {
  await expect(pimPage.tableRows.first()).toBeVisible({ timeout: 10000 });
});

Then('table should display {string}', async ({ pimPage }, message: string) => {
  await expect(pimPage.noRecordsLabel).toBeVisible({ timeout: 10000 });
});

When('user clicks edit on the first record', async ({ pimPage }) => {
  await pimPage.clickEditFirstRecord();
});

When(
  'user updates middle name to {string} and saves',
  async ({ pimPage }, middle: string) => {
    await pimPage.updateMiddleName(middle);
  },
);

When('user deletes the first record', async ({ pimPage }) => {
  await pimPage.deleteFirstRecord();
});

Then('success toast notification should appear', async ({ pimPage }) => {
  await expect(pimPage.toastSuccess).toBeVisible({ timeout: 15000 });
});
