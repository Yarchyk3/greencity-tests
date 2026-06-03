import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { NewsDetailPage } from '../pages/news-detail.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-09: Edit News button visible only to the author', () => {
  test('Author sees Edit News button on their own post', async ({ page }) => {
    allure.label('feature', 'Edit News');
    allure.label('story', 'TC-09');
    allure.severity('critical');

    await allure.step('Log in as author', async () => {
      await loginUser(page);
    });

    const newsPage = new NewsPage(page);
    const createPage = new CreateNewsPage(page);
    const detailPage = new NewsDetailPage(page);

    await allure.step('Create a news post', async () => {
      await newsPage.navigate();
      await newsPage.clickCreateNews();
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.selectTag('News');
      await createPage.fillMainText(NEWS_DATA.validContent);
      await createPage.clickPublish();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Open the created news post', async () => {
      await newsPage.navigate();
      const firstCard = await newsPage.getFirstNewsCard();
      await firstCard.click();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Verify Edit News button is visible to the author', async () => {
      const isVisible = await detailPage.isEditButtonVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});
