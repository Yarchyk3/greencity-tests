import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';

test.describe('TC-07: Cancel button confirmation modal', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('"Yes, cancel" closes form and redirects to news page', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-07');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill form fields', async () => {
      await createPage.fillTitle('Test');
      await createPage.fillMainText('Test content with 20 chars');
    });

    await allure.step('Click Cancel button', async () => {
      await createPage.clickCancel();
    });

    await allure.step('Verify confirmation modal is visible', async () => {
      await expect(createPage.cancelModal).toBeVisible();
    });

    await allure.step('Verify modal contains correct message', async () => {
      const modalText = await createPage.cancelModal.textContent();
      expect(modalText).toContain('cancel');
    });

    await allure.step('Click "Yes, cancel"', async () => {
      await createPage.confirmCancel();
    });

    await allure.step('Verify redirected to news page', async () => {
      await expect(page).toHaveURL(/news/);
      await expect(page).not.toHaveURL(/create-news/);
    });
  });

  test('"Continue editing" keeps form open with data intact', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-07');
    allure.severity('normal');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill form fields', async () => {
      await createPage.fillTitle('Test');
      await createPage.fillMainText('Test content with 20 chars');
    });

    await allure.step('Click Cancel button', async () => {
      await createPage.clickCancel();
    });

    await allure.step('Verify confirmation modal is visible', async () => {
      await expect(createPage.cancelModal).toBeVisible();
    });

    await allure.step('Click "Continue editing"', async () => {
      await createPage.continueEditing();
    });

    await allure.step('Verify modal is closed and still on create-news page', async () => {
      await expect(createPage.cancelModal).not.toBeVisible();
      await expect(page).toHaveURL(/create-news/);
    });

    await allure.step('Verify form data is intact', async () => {
      const titleValue = await createPage.getTitleValue();
      expect(titleValue).toBe('Test');
    });
  });
});
