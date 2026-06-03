import { Page, Locator } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer, .footer');
  }

  async isVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }
}
