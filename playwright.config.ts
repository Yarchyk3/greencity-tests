import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
      },
    ],
  ],
  use: {
    baseURL: 'https://www.greencity.cx.ua/#/greenCity',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
