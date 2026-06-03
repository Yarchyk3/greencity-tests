import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { NewsDetailPage } from '../pages/news-detail.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-10: Author can edit their own news post', () => {
  test('Edit news updates content and preserves creation date', async ({ page }) => {
    allure.label('feature', 'Edit News');
    allure.label('story', 'TC-10');
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

    const originalDate = await allure.step('Save original creation date', async () => {
      return await detailPage.getDateText();
    });

    await allure.step('Click Edit News button', async () => {
      await detailPage.clickEditNews();
    });

    await allure.step('Modify title, content, and tags', async () => {
      await createPage.clearTitle();
      await createPage.fillTitle(NEWS_DATA.editedTitle);
      await createPage.fillMainText(NEWS_DATA.editedContent);
      await createPage.selectTag('Events');
    });

    await allure.step('Click Submit to save changes', async () => {
      await createPage.clickSubmit();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Verify title is updated', async () => {
      const updatedTitle = await detailPage.getTitleText();
      expect(updatedTitle).toContain(NEWS_DATA.editedTitle);
    });

    await allure.step('Verify content is updated', async () => {
      const updatedContent = await detailPage.getContentText();
      expect(updatedContent).toContain(NEWS_DATA.editedContent);
    });

    await allure.step('Verify creation date has not changed', async () => {
      const currentDate = await detailPage.getDateText();
      expect(currentDate).toBe(originalDate);
    });
  });
});
