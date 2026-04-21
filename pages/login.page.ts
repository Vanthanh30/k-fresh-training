import test, { expect, Page } from '@playwright/test';
import { User } from '../models/index';
import { LoginLocators } from '../locators/login.locators';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';

export class LoginPage extends LoginLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  @step('Login with user credentials')
  async login(user: User) {
    await test.step(`Login with email: ${user.email}`, async () => {
      await this.inputEmail.fill(user.email);
      await this.inputPassword.fill(user.password);

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        this.btnSubmit.click(),
      ]);
    });
  }

  @step('Verify successful login')
  async expectSuccessfulLogin() {
    await test.step('Verify redirected away from login page', async () => {
      await expect(this.page).not.toHaveURL(/route=account\/login/);
    });
  }
}