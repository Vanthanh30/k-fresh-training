import { test } from '@playwright/test';
import { WishlistPage } from '../pages/wishlist.page';
import { LoginPage } from '../pages/login.page';
import { user } from '../data/user';

test.describe('Wishlist Feature', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(user.email, user.password);
  });

  // ✅ TC1: Verify wishlist page accessible
  test('TC1 - Access wishlist page', async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    await wishlistPage.navigate();
    await wishlistPage.verifyWishlistPage();
  });

  // ✅ TC2: Add product to wishlist
  test('TC2 - Add product to wishlist', async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    await wishlistPage.goToHome();
    await wishlistPage.addFirstProductToWishlist();

    await wishlistPage.navigate();
    await wishlistPage.verifyProductInWishlist();
  });

  // ✅ TC3: Navigate from wishlist to product detail
  test('TC3 - Navigate from wishlist to product detail', async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    await wishlistPage.goToHome();
    await wishlistPage.addFirstProductToWishlist();

    await wishlistPage.navigate();
    await wishlistPage.clickFirstProductInWishlist();

    await wishlistPage.verifyProductDetailPage();
  });

  // ✅ TC4: Remove product from wishlist
  test('TC4 - Remove product from wishlist', async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    await wishlistPage.goToHome();
    await wishlistPage.addFirstProductToWishlist();

    await wishlistPage.navigate();
    await wishlistPage.removeFirstProduct();

    await wishlistPage.verifyProductInWishlist();
  });

  // ✅ TC5: Wishlist persists after reload
  test('TC5 - Wishlist persists after reload', async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    await wishlistPage.goToHome();
    await wishlistPage.addFirstProductToWishlist();

    await wishlistPage.navigate();
    await page.reload();

    await wishlistPage.verifyProductInWishlist();
  });

});