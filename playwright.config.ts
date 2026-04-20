import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://ecommerce-playground.lambdatest.io',
    trace: 'on-first-retry',
    headless: false,
    actionTimeout: 15000,  // ✅ Thêm
    navigationTimeout: 30000, // ✅ Thêm
  },

  timeout: 60000, // ✅ Tăng timeout toàn cục lên 60s

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});