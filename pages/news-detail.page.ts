import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class NewsDetailPage {
  readonly page: Page;
  readonly newsTitle: Locator;
  readonly newsContent: Locator;
  readonly newsDate: Locator;
  readonly newsTags: Locator;
  readonly editNewsButton: Locator;
  readonly createdDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newsTitle = page.locator('.news-title, h1.title, .eco-news-detail-title');
    this.newsContent = page.locator('.news-content, .eco-news-detail-text, .content');
    this.newsDate = page.locator('.news-date, .creation-date, .date');
    this.newsTags = page.locator('.tag, .eco-news-tag, .tags span');
    this.editNewsButton = page.locator('button:has-text("Edit news"), .edit-news-btn');
    this.createdDate = page.locator('.created-date, .creation-date, .news-date');
  }

  async getTitleText(): Promise<string> {
    return (await this.newsTitle.textContent()) ?? '';
  }

  async getContentText(): Promise<string> {
    return (await this.newsContent.textContent()) ?? '';
  }

  async getDateText(): Promise<string> {
    return (await this.createdDate.textContent()) ?? '';
  }

  async getTagTexts(): Promise<string[]> {
    const count = await this.newsTags.count();
    const tags: string[] = [];
    for (let i = 0; i < count; i++) {
      tags.push(((await this.newsTags.nth(i).textContent()) ?? '').trim());
    }
    return tags;
  }

  async isEditButtonVisible(): Promise<boolean> {
    await allure.step('Check if Edit News button is visible', async () => {});
    return await this.editNewsButton.isVisible();
  }

  async clickEditNews(): Promise<void> {
    await allure.step('Click Edit News button', async () => {
      await this.editNewsButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }
}
