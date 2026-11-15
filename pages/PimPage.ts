import { Page, Locator } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly addEmployeeTab: Locator;
  readonly employeeListTab: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly profileHeader: Locator;
  readonly errorMessages: Locator;
  readonly searchNameInput: Locator;
  readonly searchButton: Locator;
  readonly tableRows: Locator;
  readonly noRecordsLabel: Locator;
  readonly editIcon: Locator;
  readonly deleteIcon: Locator;
  readonly confirmDeleteBtn: Locator;
  readonly toastSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.locator('a[href*="viewPimModule"]');
    this.addEmployeeTab = page.locator('//a[text()="Add Employee"]');
    this.employeeListTab = page.locator('//a[text()="Employee List"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.locator('button[type="submit"]');
    this.profileHeader = page.locator('.orangehrm-edit-employee-name h6');
    this.errorMessages = page.locator('.oxd-input-field-error-message');
    this.searchNameInput = page.locator('//label[text()="Employee Name"]/ancestor::div[contains(@class,"oxd-input-group")]//input');
    this.searchButton = page.locator('button[type="submit"]');
    this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
    this.noRecordsLabel = page.locator('//span[text()="No Records Found"]');
    // Mengambil tombol aksi di baris pertama yang bukan tombol hapus (trash)
    this.editIcon = page.locator('.oxd-table-body .oxd-table-card').first().locator('.oxd-table-cell-actions button:not(:has(i.bi-trash))');
    this.deleteIcon = page.locator('.oxd-table-cell-actions button i.bi-trash').first();
    this.confirmDeleteBtn = page.locator('.oxd-button--label-danger');
    this.toastSuccess = page.locator('.oxd-toast-content--success');
  }

  async navigateToPim() {
    await this.pimMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToAddEmployee() {
    await this.addEmployeeTab.click();
  }

  async goToEmployeeList() {
    await this.employeeListTab.click();
  }

  async fillEmployeeForm(first: string, last: string) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.saveButton.first().click();
    await this.page.waitForURL(/.*viewPersonalDetails.*/, { timeout: 15000 });
  }

  async clickSaveOnly() {
    await this.saveButton.first().click();
  }

  async searchEmployee(name: string) {
    await this.searchNameInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickEditFirstRecord() {
    await this.editIcon.click();
    await this.page.waitForURL(/.*viewPersonalDetails.*/, { timeout: 20000 });
    // Tunggu spinner loading form selesai agar input tidak tertimpa data lama
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  }

  async updateMiddleName(middle: string) {
    await this.middleNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.middleNameInput.fill(middle);
    // Klik tombol Save khusus pada form pertama (Personal Details)
    await this.page.locator('form.oxd-form').first().locator('button[type="submit"]').click();
  }

  async deleteFirstRecord() {
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }
}