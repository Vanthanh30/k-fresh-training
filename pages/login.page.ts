import test, { expect, Page } from '@playwright/test';
import { User } from '../models/index';
import { Constants } from '../utilities/constants';
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

      // ✅ Dùng dispatchEvent thay Promise.all để tránh timeout trên Firefox
      await this.btnSubmit.dispatchEvent('click');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  @step('Verify successful login')
  async expectSuccessfulLogin() {
    await test.step('Verify redirected away from login page', async () => {
      await expect(this.page).not.toHaveURL(/route=account\/login/);
    });
  }
}