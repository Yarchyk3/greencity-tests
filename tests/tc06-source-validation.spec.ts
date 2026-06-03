import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-06: Source field validation (optional, must be valid URL)', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('News published successfully with empty Source field', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-06');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill mandatory fields without Source', async () => {
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.selectTag('News');
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Leave Source field empty and publish', async () => {
      await createPage.clickPublish();
      await page.waitForLoadState('networkidle');
    });

    await allure.step('Verify news published successfully', async () => {
      await expect(page).not.toHaveURL(/create-news/);
    });
  });

  test('Invalid URL disables Publish and shows error', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-06');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill mandatory fields', async () => {
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.selectTag('News');
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Enter invalid URL in Source field', async () => {
      await createPage.fillSource(NEWS_DATA.invalidUrl);
    });

    await allure.step('Verify error message appears', async () => {
      await expect(createPage.sourceError).toBeVisible();
      const errorText = await createPage.sourceError.textContent();
      expect(errorText).toContain('http');
    });

    await allure.step('Verify Publish button is disabled', async () => {
      expect(await createPage.isPublishButtonEnabled()).toBeFalsy();
    });
  });

  test('Valid URL enables Publish and news is published with source', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-06');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill mandatory fields', async () => {
      await createPage.fillTitle(NEWS_DATA.validTitle);
      await createPage.selectTag('News');
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Enter valid URL in Source field', async () => {
      await createPage.fillSource(NEWS_DATA.validUrl);
    });

    await allure.step('Verify error message is gone', async () => {
      await expect(createPage.sourceError).not.toBeVisible();
    });

    await allure.step('Verify Publish button is enabled', async () => {
      await expect(createPage.publishButton).toBeEnabled();
    });

    await allure.step('Publish the news', async () => {
      await createPage.clickPublish();
      await page.waitForLoadState('networkidle');
      await expect(page).not.toHaveURL(/create-news/);
    });
  });
});
