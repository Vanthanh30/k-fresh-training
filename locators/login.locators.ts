import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class LoginLocators extends CommonLocators {
  inputEmail!: Locator;
  inputPassword!: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorInitialization(); // ✅ Gọi sau super()
  }

  locatorInitialization() {
    super.locatorInitialization();
    this.inputEmail = this.page.locator('input[name="email"]');
    this.inputPassword = this.page.locator('input[name="password"]');
  }
}