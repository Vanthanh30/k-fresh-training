import { Page, expect } from '@playwright/test';
import { ROUTES } from '../utilities/constants';
import { wishlistLocators } from '../locators/wishlist.locators';

export class WishlistPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(ROUTES.wishlist);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyWishlistPage() {
    await expect(this.page).toHaveURL(/wishlist/);
  }

async clickFirstProductInWishlist() {
  await this.page.keyboard.press('Escape');
  await this.page.waitForTimeout(500);

  await this.page.waitForSelector(wishlistLocators.productLink, { state: 'visible' });

  await this.page.locator(wishlistLocators.productLink).first().dispatchEvent('click');
  await this.page.waitForLoadState('domcontentloaded');
}
  async verifyProductDetailPage() {
    await expect(this.page).toHaveURL(/product_id/);
  }

  async addFirstProductToWishlist() {
    const firstProduct = this.page.locator(wishlistLocators.productCard).first();

    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();
    await this.page.waitForTimeout(500);

    await firstProduct.locator(wishlistLocators.addToWishlistBtn).click();
    await this.page.waitForTimeout(1500);
  }

  async goToHome() {
    await this.page.goto(ROUTES.home);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyProductInWishlist() {
    await expect(
      this.page.locator(wishlistLocators.content)
    ).not.toContainText('Your wish list is empty');
  }

  async removeFirstProduct() {
    await this.page.locator(wishlistLocators.removeBtn).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}