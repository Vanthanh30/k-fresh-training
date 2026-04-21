import { test } from '../pages/base-page';
import { loadUserFromJson } from '../data/user.helper';
import { Constants } from '../utilities/constants';

const user = loadUserFromJson(Constants.ENV);

test.describe('Wishlist Feature', () => {

  test.beforeEach(async ({ loginPage, commonPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
    await loginPage.expectSuccessfulLogin();
  });

  // ✅ TC1: Verify wishlist page accessible
  test('TC1 - Access wishlist page', async ({ wishlistPage }) => {
    await wishlistPage.navigate();
    await wishlistPage.verifyWishlistPage();
  });

  // ✅ TC2: Add product to wishlist
  test('TC2 - Add product to wishlist', async ({ wishlistPage }) => {
    await wishlistPage.addFirstProductToWishlist();
    await wishlistPage.navigate();
    await wishlistPage.verifyProductInWishlist();
  });

  // ✅ TC3: Navigate from wishlist to product detail
  test('TC3 - Navigate from wishlist to product detail', async ({ wishlistPage }) => {
    await wishlistPage.addFirstProductToWishlist();
    await wishlistPage.navigate();
    await wishlistPage.clickFirstProductInWishlist();
    await wishlistPage.verifyProductDetailPage();
  });

  // ✅ TC4: Remove product from wishlist
  test('TC4 - Remove product from wishlist', async ({ wishlistPage }) => {
    await wishlistPage.addFirstProductToWishlist();
    await wishlistPage.navigate();
    await wishlistPage.removeFirstProduct();
    await wishlistPage.verifyProductInWishlist();
  });

  // ✅ TC5: Wishlist persists after reload
  test('TC5 - Wishlist persists after reload', async ({ wishlistPage }) => {
    await wishlistPage.addFirstProductToWishlist();
    await wishlistPage.navigate();
    await wishlistPage.verifyAfterReload();
  });

});