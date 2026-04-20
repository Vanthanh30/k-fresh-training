import { Page } from '@playwright/test';
import { ROUTES } from '../utilities/constants';

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto(ROUTES.login);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    
    // ✅ Dùng Promise.all để click và chờ navigation cùng lúc
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.page.click('input[type="submit"]'),
    ]);
  }
}