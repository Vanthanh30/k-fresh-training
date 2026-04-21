export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/index.php?route=account/login`;
  static readonly WISHLIST_URL = `${Constants.BASE_URL}/index.php?route=account/wishlist`;
  static readonly HOME_URL = `${Constants.BASE_URL}/index.php?route=common/home`;
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'thanhho@gmail.com';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || 'xX5KhJr!bvt6cCG';
  static readonly USERS_JSON_FILE = './data/users.json';
}