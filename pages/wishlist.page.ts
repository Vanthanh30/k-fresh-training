import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { WishlistLocators } from '../locators/wishlist.locators';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';

export class WishlistPage extends WishlistLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  @step('Navigate to wishlist page')
  async navigate() {
    await this.commonPage.goto(Constants.WISHLIST_URL);
  }

  @step('Verify wishlist page URL')
  async verifyWishlistPage() {
    await test.step('Check URL contains wishlist', async () => {
      await expect(this.page).toHaveURL(/wishlist/);
    });
  }

@step('Add first product to wishlist')
async addFirstProductToWishlist() {
  await test.step('Go to home page', async () => {
    await this.commonPage.goto(Constants.HOME_URL);
  });

  await test.step('Hover and click wishlist button', async () => {
    // ✅ Dùng domcontentloaded thay networkidle — Firefox không bị timeout
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);

    // ✅ Dùng evaluate để scroll và click bằng JS thuần — bypass Firefox stability issue
    await this.page.evaluate(() => {
      const products = document.querySelectorAll('.product-thumb');
      const product = products[1] as HTMLElement;
      if (product) {
        product.scrollIntoView({ behavior: 'instant', block: 'center' });
        const btn = product.querySelector('button.btn-wishlist') as HTMLElement;
        if (btn) btn.click();
      }
    });

    await this.page.waitForResponse(res =>
      res.url().includes('wishlist') && res.status() === 200
    );
  });
}

  @step('Verify product exists in wishlist')
  async verifyProductInWishlist() {
    await test.step('Check wishlist is not empty', async () => {
      await expect(this.content).not.toContainText('Your wish list is empty');
    });
  }

  @step('Click first product in wishlist')
  async clickFirstProductInWishlist() {
    await test.step('Click product link', async () => {
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      await this.productLink.first().dispatchEvent('click');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  @step('Verify product detail page')
  async verifyProductDetailPage() {
    await test.step('Check URL contains product_id', async () => {
      await expect(this.page).toHaveURL(/product_id/);
    });
  }

 @step('Remove first product from wishlist')
  async removeFirstProduct() {
    await test.step('Click remove button', async () => {
      // ✅ Dùng dispatchEvent thay vì click() để bypass Firefox issue
      await this.removeBtn.first().dispatchEvent('click');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
  @step('Verify wishlist persists after reload')
  async verifyAfterReload() {
    await test.step('Reload page', async () => {
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
    });
    await this.verifyProductInWishlist();
  }
}