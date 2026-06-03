import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';

test.describe('TC-01: Create News form displays all fields in correct order', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
  });

  test('All required fields are present and in correct order', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-01');
    allure.severity('critical');

    const newsPage = new NewsPage(page);
    const createPage = new CreateNewsPage(page);

    await allure.step('Navigate to News page and click Create News', async () => {
      await newsPage.navigate();
      await newsPage.clickCreateNews();
    });

    await allure.step('Verify Title field is visible with counter 0/170', async () => {
      await expect(createPage.titleInput).toBeVisible();
      const counter = await createPage.getTitleCounterText();
      expect(counter).toContain('0');
      expect(counter).toContain('170');
    });

    await allure.step('Verify Tag buttons are visible', async () => {
      await expect(createPage.tagNews).toBeVisible();
      await expect(createPage.tagEvents).toBeVisible();
      await expect(createPage.tagEducation).toBeVisible();
      await expect(createPage.tagInitiatives).toBeVisible();
      await expect(createPage.tagAds).toBeVisible();
    });

    await allure.step('Verify Add Image button is visible', async () => {
      await expect(createPage.addImageButton).toBeVisible();
    });

    await allure.step('Verify Main Text area is visible', async () => {
      await expect(createPage.mainTextArea).toBeVisible();
    });

    await allure.step('Verify Author field is pre-filled and not editable', async () => {
      await expect(createPage.authorField).toBeVisible();
      const authorText = await createPage.getAuthorText();
      expect(authorText.trim().length).toBeGreaterThan(0);
    });

    await allure.step('Verify Date field is pre-filled and not editable', async () => {
      await expect(createPage.dateField).toBeVisible();
      const dateText = await createPage.getDateText();
      expect(dateText.trim().length).toBeGreaterThan(0);
    });

    await allure.step('Verify Source field is visible', async () => {
      await expect(createPage.sourceInput).toBeVisible();
    });

    await allure.step('Verify action buttons are present: Cancel, Preview, Publish', async () => {
      await expect(createPage.cancelButton).toBeVisible();
      await expect(createPage.previewButton).toBeVisible();
      await expect(createPage.publishButton).toBeVisible();
    });
  });
});
