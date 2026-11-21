import { Page, Locator } from "@playwright/test";

export class TextBoxPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly output: Locator;
  readonly addButton: Locator;
  readonly registrationModal: Locator;
  readonly modalTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail");
    this.currentAddressInput = page.locator("textarea#currentAddress");
    this.permanentAddressInput = page.locator("textarea#permanentAddress");
    this.submitButton = page.locator("#submit");
    this.output = page.locator("#output");
    this.addButton = page.locator("#addNewRecordButton");
    this.registrationModal = page.locator(".modal-content");
    this.modalTitle = page.locator("#registration-form-modal");
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.ageInput = page.locator("#age");
    this.salaryInput = page.locator("#salary");
    this.departmentInput = page.locator("#department");
    this.tableRows = page.getByRole("row");
  }

  private getField(label: string): Locator {
    const fields: Record<string, Locator> = {
      "Full Name": this.fullNameInput,
      "Email": this.emailInput,
      "Current Address": this.currentAddressInput,
      "Permanent Address": this.permanentAddressInput,
      "First Name": this.firstNameInput,
      "Last Name": this.lastNameInput,
      "Age": this.ageInput,
      "Salary": this.salaryInput,
      "Department": this.departmentInput,
    };

    const field = fields[label];
    if (!field) {
      throw new Error(`Field "${label}" tidak ditemukan`);
    }
    return field;
  }

  async fillField(label: string, value: string) {
    await this.getField(label).fill(value);
  }

  getRowByEmail(email: string): Locator {
    return this.tableRows.filter({ hasText: email });
  }
}