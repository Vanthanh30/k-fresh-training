import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class WishlistLocators extends CommonLocators {
  productCard!: Locator;
  addToWishlistBtn!: Locator;
  removeBtn!: Locator;
  content!: Locator;
  wishlistTableRows!: Locator;
  productLink!: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorInitialization(); // ✅ Gọi sau super()
  }

  locatorInitialization() {
    super.locatorInitialization();
    this.productCard = this.page.locator('.product-thumb');
    this.addToWishlistBtn = this.page.locator('button.btn-wishlist');
    this.removeBtn = this.page.locator('a.text-danger');
    this.content = this.page.locator('#content');
    this.wishlistTableRows = this.page.locator('#content table tbody tr');
    this.productLink = this.page.locator('table tbody tr td.text-left a');
  }
}