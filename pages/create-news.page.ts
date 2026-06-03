import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class CreateNewsPage {
  readonly page: Page;

  // Form fields
  readonly titleInput: Locator;
  readonly titleCounter: Locator;
  readonly mainTextArea: Locator;
  readonly sourceInput: Locator;
  readonly authorField: Locator;
  readonly dateField: Locator;
  readonly addImageButton: Locator;
  readonly imageUploadInput: Locator;

  // Tag buttons
  readonly tagNews: Locator;
  readonly tagEvents: Locator;
  readonly tagEducation: Locator;
  readonly tagInitiatives: Locator;
  readonly tagAds: Locator;

  // Action buttons
  readonly publishButton: Locator;
  readonly cancelButton: Locator;
  readonly previewButton: Locator;
  readonly backToEditingButton: Locator;

  // Errors
  readonly titleError: Locator;
  readonly mainTextError: Locator;
  readonly sourceError: Locator;
  readonly imageError: Locator;

  // Modal
  readonly cancelModal: Locator;
  readonly modalYesCancel: Locator;
  readonly modalContinueEditing: Locator;

  // Preview
  readonly previewTitle: Locator;
  readonly previewContent: Locator;
  readonly previewDate: Locator;
  readonly previewAuthor: Locator;

  // Edit
  readonly editNewsButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.locator('app-news-title textarea, textarea[formcontrolname="title"], .title-textarea');
    this.titleCounter = page.locator('.title-counter, .char-counter, span:has-text("/170")');
    this.mainTextArea = page.locator('.ql-editor, [formcontrolname="content"], .main-text-area');
    this.sourceInput = page.locator('input[formcontrolname="source"], .source-input input');
    this.authorField = page.locator('.author-name, [formcontrolname="author"], .news-author');
    this.dateField = page.locator('.date-field, [formcontrolname="date"], .news-date');
    this.addImageButton = page.locator('.add-image-btn, app-add-photo, .upload-photo-container');
    this.imageUploadInput = page.locator('input[type="file"]');

    this.tagNews = page.locator('button.tag-item:has-text("News"), .tags button:has-text("News")');
    this.tagEvents = page.locator('button.tag-item:has-text("Events"), .tags button:has-text("Events")');
    this.tagEducation = page.locator('button.tag-item:has-text("Education"), .tags button:has-text("Education")');
    this.tagInitiatives = page.locator('button.tag-item:has-text("Initiatives"), .tags button:has-text("Initiatives")');
    this.tagAds = page.locator('button.tag-item:has-text("Ads"), .tags button:has-text("Ads")');

    this.publishButton = page.locator('button:has-text("Publish"), .publish-btn');
    this.cancelButton = page.locator('button:has-text("Cancel"), .cancel-btn');
    this.previewButton = page.locator('button:has-text("Preview"), .preview-btn');
    this.backToEditingButton = page.locator('button:has-text("Back to editing"), .back-to-editing');

    this.titleError = page.locator('.title-error, .invalid-feedback:near(textarea[formcontrolname="title"])');
    this.mainTextError = page.locator('.content-error, span:has-text("minimum of 20")');
    this.sourceError = page.locator('.source-error, span:has-text("Please add the link")');
    this.imageError = page.locator('.image-error, span:has-text("Upload only PNG")');

    this.cancelModal = page.locator('app-modal-confirm, .cancel-modal, mat-dialog-container');
    this.modalYesCancel = page.locator('button:has-text("Yes, cancel"), .yes-cancel-btn');
    this.modalContinueEditing = page.locator('button:has-text("Continue editing"), .continue-editing-btn');

    this.previewTitle = page.locator('.preview-title, .news-title-preview');
    this.previewContent = page.locator('.preview-content, .news-content-preview');
    this.previewDate = page.locator('.preview-date, .news-date-preview');
    this.previewAuthor = page.locator('.preview-author, .news-author-preview');

    this.editNewsButton = page.locator('button:has-text("Edit news"), .edit-news-btn');
    this.submitButton = page.locator('button:has-text("Submit"), .submit-btn');
  }

  async navigate(): Promise<void> {
    await allure.step('Navigate to Create News page', async () => {
      await this.page.goto('https://www.greencity.cx.ua/#/greenCity/news/create-news');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillTitle(text: string): Promise<void> {
    await allure.step(`Fill title with: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`, async () => {
      await this.titleInput.click();
      await this.titleInput.fill(text);
    });
  }

  async clearTitle(): Promise<void> {
    await allure.step('Clear title field', async () => {
      await this.titleInput.click();
      await this.titleInput.fill('');
    });
  }

  async fillMainText(text: string): Promise<void> {
    await allure.step(`Fill main text (${text.length} chars)`, async () => {
      await this.mainTextArea.click();
      await this.mainTextArea.fill(text);
    });
  }

  async fillSource(url: string): Promise<void> {
    await allure.step(`Fill source URL: "${url}"`, async () => {
      await this.sourceInput.fill(url);
      await this.sourceInput.blur();
    });
  }

  async selectTag(tagName: 'News' | 'Events' | 'Education' | 'Initiatives' | 'Ads'): Promise<void> {
    await allure.step(`Select tag: "${tagName}"`, async () => {
      const tagMap: Record<string, Locator> = {
        News: this.tagNews,
        Events: this.tagEvents,
        Education: this.tagEducation,
        Initiatives: this.tagInitiatives,
        Ads: this.tagAds,
      };
      await tagMap[tagName].click();
    });
  }

  async getSelectedTagsCount(): Promise<number> {
    const selected = this.page.locator('.tag-item.active, button.tag-item[class*="checked"], button.tag-item[class*="active"]');
    return await selected.count();
  }

  async isTagDisabled(tagName: string): Promise<boolean> {
    const tag = this.page.locator(`button.tag-item:has-text("${tagName}")`);
    return await tag.isDisabled();
  }

  async clickPublish(): Promise<void> {
    await allure.step('Click Publish button', async () => {
      await this.publishButton.click();
    });
  }

  async clickCancel(): Promise<void> {
    await allure.step('Click Cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  async clickPreview(): Promise<void> {
    await allure.step('Click Preview button', async () => {
      await this.previewButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickBackToEditing(): Promise<void> {
    await allure.step('Click Back to editing', async () => {
      await this.backToEditingButton.click();
    });
  }

  async confirmCancel(): Promise<void> {
    await allure.step('Confirm cancel in modal (Yes, cancel)', async () => {
      await this.modalYesCancel.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async continueEditing(): Promise<void> {
    await allure.step('Click Continue editing in modal', async () => {
      await this.modalContinueEditing.click();
    });
  }

  async uploadImage(filePath: string): Promise<void> {
    await allure.step(`Upload image: ${filePath}`, async () => {
      await this.imageUploadInput.setInputFiles(filePath);
    });
  }

  async getTitleCounterText(): Promise<string> {
    return (await this.titleCounter.textContent()) ?? '';
  }

  async isPublishButtonEnabled(): Promise<boolean> {
    return await this.publishButton.isEnabled();
  }

  async isTitleBorderRed(): Promise<boolean> {
    const borderColor = await this.titleInput.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    return borderColor.includes('255, 0') || borderColor.includes('rgb(255') || borderColor.includes('red');
  }

  async clickEditNews(): Promise<void> {
    await allure.step('Click Edit News button', async () => {
      await this.editNewsButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickSubmit(): Promise<void> {
    await allure.step('Click Submit button', async () => {
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async getTitleValue(): Promise<string> {
    return (await this.titleInput.inputValue()) ?? '';
  }

  async getAuthorText(): Promise<string> {
    return (await this.authorField.textContent()) ?? '';
  }

  async getDateText(): Promise<string> {
    return (await this.dateField.textContent()) ?? '';
  }
}
