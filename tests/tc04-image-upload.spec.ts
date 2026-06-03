import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser, createTempImageFile } from '../utils/helpers';

test.describe('TC-04: Image upload validation (PNG/JPG, max 10MB)', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('Valid PNG file (5MB) uploads successfully', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-04');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    const pngFile = await createTempImageFile('valid-5mb.png', 5 * 1024 * 1024, 'png');

    await allure.step('Upload valid PNG file (5MB)', async () => {
      await createPage.uploadImage(pngFile);
    });

    await allure.step('Verify no error message is shown', async () => {
      await expect(createPage.imageError).not.toBeVisible();
    });
  });

  test('GIF file triggers error message', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-04');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    const gifFile = await createTempImageFile('invalid.gif', 1 * 1024 * 1024, 'gif');

    await allure.step('Upload GIF file (1MB)', async () => {
      await createPage.uploadImage(gifFile);
    });

    await allure.step('Verify error message appears', async () => {
      await expect(createPage.imageError).toBeVisible();
      const errorText = await createPage.imageError.textContent();
      expect(errorText).toContain('PNG');
    });
  });

  test('JPEG over 10MB triggers error message', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-04');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    const largeJpg = await createTempImageFile('large-15mb.jpg', 15 * 1024 * 1024, 'jpg');

    await allure.step('Upload oversized JPEG (15MB)', async () => {
      await createPage.uploadImage(largeJpg);
    });

    await allure.step('Verify error message appears', async () => {
      await expect(createPage.imageError).toBeVisible();
      const errorText = await createPage.imageError.textContent();
      expect(errorText).toContain('10MB');
    });
  });
});
