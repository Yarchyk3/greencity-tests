import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-03: Tag selection (1 to 3 tags allowed)', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('Can select and publish with one tag', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-03');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Select one tag: News', async () => {
      await createPage.selectTag('News');
    });

    await allure.step('Fill required fields', async () => {
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Verify exactly one tag is selected', async () => {
      const count = await createPage.getSelectedTagsCount();
      expect(count).toBe(1);
    });

    await allure.step('Publish the news', async () => {
      await createPage.clickPublish();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Verify successful publish (redirected away from create page)', async () => {
      await expect(page).not.toHaveURL(/create-news/);
    });
  });

  test('Can select up to three tags', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-03');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Select three tags: News, Events, Education', async () => {
      await createPage.selectTag('News');
      await createPage.selectTag('Events');
      await createPage.selectTag('Education');
    });

    await allure.step('Verify three tags are selected', async () => {
      const count = await createPage.getSelectedTagsCount();
      expect(count).toBe(3);
    });

    await allure.step('Fill required fields and publish', async () => {
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.fillMainText(NEWS_DATA.validContent);
      await createPage.clickPublish();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Verify successful publish', async () => {
      await expect(page).not.toHaveURL(/create-news/);
    });
  });

  test('Cannot select more than three tags', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-03');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Select three tags', async () => {
      await createPage.selectTag('News');
      await createPage.selectTag('Events');
      await createPage.selectTag('Education');
    });

    await allure.step('Attempt to select a fourth tag: Initiatives', async () => {
      const isDisabled = await createPage.isTagDisabled('Initiatives');
      expect(isDisabled).toBeTruthy();
    });

    await allure.step('Verify tag count remains at 3', async () => {
      const count = await createPage.getSelectedTagsCount();
      expect(count).toBe(3);
    });
  });
});
