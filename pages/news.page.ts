import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';

export class NewsPage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly createNewsButton: Locator;
  readonly newsCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.createNewsButton = page.locator('a[href*="create-news"], .create-button, button:has-text("Create news")');
    this.newsCards = page.locator('.eco-news-list .card, app-eco-news-widget, .news-card');
  }

  async navigate(): Promise<void> {
    await allure.step('Navigate to News page', async () => {
      await this.page.goto('https://www.greencity.cx.ua/#/greenCity/news');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickCreateNews(): Promise<void> {
    await allure.step('Click Create News button', async () => {
      await this.createNewsButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async getFirstNewsCard(): Promise<Locator> {
    return this.newsCards.first();
  }
}
