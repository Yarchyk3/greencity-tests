import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class HeaderComponent {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly userMenu: Locator;
  readonly logoLink: Locator;
  readonly ecoNewsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('.header_sign-in-link, [href*="auth/sign-in"], .sign-in');
    this.userMenu = page.locator('.header_user-avatar, .user-avatar, .profile-avatar');
    this.logoLink = page.locator('.header_logo, .logo');
    this.ecoNewsLink = page.locator('a[href*="eco-news"], a[href*="news"]').first();
  }

  async clickSignIn(): Promise<void> {
    await allure.step('Click Sign In button in header', async () => {
      await this.signInButton.click();
    });
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }

  async navigateToNews(): Promise<void> {
    await allure.step('Navigate to News via header', async () => {
      await this.ecoNewsLink.click();
    });
  }
}
