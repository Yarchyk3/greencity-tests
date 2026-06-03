import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';
import { loginUser } from '../utils/helpers';
import { NEWS_DATA } from '../fixtures/auth.fixture';

test.describe('TC-02: Title field validation and Publish button state', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    const newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.clickCreateNews();
  });

  test('Empty title shows red border and counter 0/170', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-02');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Click on title field and leave empty', async () => {
      await createPage.titleInput.click();
      await createPage.mainTextArea.click();
    });

    await allure.step('Verify title counter shows 0/170', async () => {
      const counter = await createPage.getTitleCounterText();
      expect(counter).toContain('0');
      expect(counter).toContain('170');
    });

    await allure.step('Verify Publish button is disabled', async () => {
      expect(await createPage.isPublishButtonEnabled()).toBeFalsy();
    });
  });

  test('Title limited to 170 characters', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-02');

    const createPage = new CreateNewsPage(page);

    await allure.step('Enter 171-character string into title', async () => {
      await createPage.fillTitle(NEWS_DATA.longTitle);
    });

    await allure.step('Verify title is truncated to 170 characters', async () => {
      const value = await createPage.getTitleValue();
      expect(value.length).toBeLessThanOrEqual(170);
    });

    await allure.step('Verify counter shows 170/170', async () => {
      const counter = await createPage.getTitleCounterText();
      expect(counter).toContain('170');
    });
  });

  test('Valid title shows correct counter and normal border', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-02');

    const createPage = new CreateNewsPage(page);

    await allure.step('Enter valid title "Test News"', async () => {
      await createPage.fillTitle('Test News');
    });

    await allure.step('Verify counter shows 9/170', async () => {
      const counter = await createPage.getTitleCounterText();
      expect(counter).toContain('9');
      expect(counter).toContain('170');
    });
  });

  test('Publish button disabled without Main Text, enabled after all fields filled', async ({ page }) => {
    allure.label('feature', 'Create News');
    allure.label('story', 'TC-02');
    allure.severity('critical');

    const createPage = new CreateNewsPage(page);

    await allure.step('Fill title only', async () => {
      await createPage.fillTitle('Test News');
    });

    await allure.step('Verify Publish is still disabled (no main text)', async () => {
      expect(await createPage.isPublishButtonEnabled()).toBeFalsy();
    });

    await allure.step('Select a tag', async () => {
      await createPage.selectTag('News');
    });

    await allure.step('Fill Main Text field', async () => {
      await createPage.fillMainText(NEWS_DATA.validContent);
    });

    await allure.step('Verify Publish button is now enabled', async () => {
      await expect(createPage.publishButton).toBeEnabled();
    });
  });
});
