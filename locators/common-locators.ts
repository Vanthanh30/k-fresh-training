import { Locator, Page } from '@playwright/test';

export class CommonLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ✅ Không gọi locatorInitialization() trong constructor base
  setPage(page: Page) {
    this.page = page;
    this.locatorInitialization();
  }

  getPage() {
    return this.page;
  }

  btnSubmit!: Locator;

  locatorInitialization() {
    this.btnSubmit = this.page.locator('input[type="submit"]');
  }
}