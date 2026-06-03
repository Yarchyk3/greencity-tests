import { Page, Locator } from '@playwright/test';

export class NewsCardComponent {
  readonly page: Page;
  readonly card: Locator;

  constructor(page: Page, card: Locator) {
    this.page = page;
    this.card = card;
  }

  async getTitle(): Promise<string> {
    return (await this.card.locator('.title, h3, h2').textContent()) ?? '';
  }

  async getTags(): Promise<string[]> {
    const tagElements = this.card.locator('.tag, .eco-news-tag');
    const count = await tagElements.count();
    const tags: string[] = [];
    for (let i = 0; i < count; i++) {
      tags.push((await tagElements.nth(i).textContent()) ?? '');
    }
    return tags;
  }

  async click(): Promise<void> {
    await this.card.click();
  }
}
