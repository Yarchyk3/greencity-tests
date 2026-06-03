import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-05: Main Text field validation (min 20, max 63206 chars)', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('Text shorter than 20 chars shows error and disables Publish', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-05');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill title and select tag', async () => {
      await createPage.fillTitle('Test');
      await createPage.selectTag('News');
    });

    await allure.step('Enter 10-character text into Main Text', async () => {
      await createPage.fillMainText(NEWS_DATA.shortContent);
    });

    await allure.step('Click outside to trigger validation', async () => {
      await createPage.titleInput.click();
    });

    await allure.step('Verify error message is visible', async () => {
      await expect(createPage.mainTextError).toBeVisible();
      const errorText = await createPage.mainTextError.textContent();
      expect(errorText).toContain('20');
    });

    await allure.step('Verify Publish button remains disabled', async () => {
      expect(await createPage.isPublishButtonEnabled()).toBeFalsy();
    });
  });

  test('Text exceeding 63206 chars is truncated', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-05');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Enter 63207 characters into Main Text', async () => {
      await createPage.fillMainText(NEWS_DATA.longContent);
    });

    await allure.step('Verify text does not exceed 63206 characters', async () => {
      const value = await createPage.mainTextArea.textContent();
      expect((value ?? '').length).toBeLessThanOrEqual(63206);
    });
  });

  test('Valid text (25 chars) enables Publish and news is published', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-05');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill title and select tag', async () => {
      await createPage.fillTitle('Test');
      await createPage.selectTag('News');
    });

    await allure.step('Enter valid content (25+ chars)', async () => {
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Verify no error message is shown', async () => {
      await expect(createPage.mainTextError).not.toBeVisible();
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
