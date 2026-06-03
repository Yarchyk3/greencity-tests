import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';

test.describe('TC-08: Preview mode displays entered data correctly', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('Preview shows correct title, content, date and author', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-08');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);
    const testTitle = 'Test Preview';
    const testContent = 'This is a test preview content';

    await allure.step('Fill title field', async () => {
      await createPage.fillTitle(testTitle);
    });

    await allure.step('Fill main text field', async () => {
      await createPage.fillMainText(testContent);
    });

    await allure.step('Click Preview button', async () => {
      await createPage.clickPreview();
    });

    await allure.step('Verify preview title matches input', async () => {
      await expect(createPage.previewTitle).toBeVisible();
      const previewTitleText = await createPage.previewTitle.textContent();
      expect(previewTitleText).toContain(testTitle);
    });

    await allure.step('Verify preview content matches input', async () => {
      await expect(createPage.previewContent).toBeVisible();
      const previewContentText = await createPage.previewContent.textContent();
      expect(previewContentText).toContain(testContent);
    });

    await allure.step('Verify preview shows current date', async () => {
      await expect(createPage.previewDate).toBeVisible();
      const dateText = await createPage.previewDate.textContent();
      expect(dateText?.trim().length).toBeGreaterThan(0);
    });

    await allure.step('Verify author name is displayed', async () => {
      await expect(createPage.previewAuthor).toBeVisible();
    });

    await allure.step('Verify "Back to editing" button is available', async () => {
      await expect(createPage.backToEditingButton).toBeVisible();
    });

    await allure.step('Click Back to editing returns to form', async () => {
      await createPage.clickBackToEditing();
      await expect(createPage.titleInput).toBeVisible();
    });
  });
});
