import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"], input[type="email"]');
    this.passwordInput = page.locator('input[name="password"], input[type="password"]');
    this.signInButton = page.locator('button[type="submit"], .sign-in-btn, app-submit-button button');
    this.closeButton = page.locator('.close-modal-window, .cross-btn, button.close');
  }

  async login(email: string, password: string): Promise<void> {
    await allure.step(`Login with email: ${email}`, async () => {
      await allure.step('Fill email field', async () => {
        await this.emailInput.fill(email);
      });
      await allure.step('Fill password field', async () => {
        await this.passwordInput.fill(password);
      });
      await allure.step('Click Sign In button', async () => {
        await this.signInButton.click();
      });
      await this.page.waitForLoadState('networkidle');
    });
  }
}
