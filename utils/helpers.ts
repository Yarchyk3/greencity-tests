/// <reference types="node" />
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NewsPage } from '../pages/news.page';
import { HeaderComponent } from '../components/header.component';
import { TEST_USER } from '../fixtures/auth.fixture';
import * as fs from 'fs';
import * as path from 'path';

export async function loginUser(page: Page): Promise<void> {
  const newsPage = new NewsPage(page);
  const header = new HeaderComponent(page);
  const loginPage = new LoginPage(page);

  await newsPage.navigate();
  await header.clickSignIn();
  await page.waitForLoadState('networkidle');
  await loginPage.login(TEST_USER.email, TEST_USER.password);
  await page.waitForLoadState('networkidle');
}

export async function createTempImageFile(
  filename: string,
  sizeInBytes: number,
  format: 'png' | 'jpg' | 'gif' = 'png'
): Promise<string> {
  const tmpDir = '/tmp/test-images';
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const filePath = path.join(tmpDir, filename);

  // PNG header bytes
  const pngHeader = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  // GIF header bytes
  const gifHeader = Buffer.from('GIF89a');

  let headerBuffer: Buffer;
  if (format === 'gif') {
    headerBuffer = gifHeader;
  } else {
    headerBuffer = pngHeader;
  }

  const padding = Buffer.alloc(sizeInBytes - headerBuffer.length, 0);
  const fileBuffer = Buffer.concat([headerBuffer, padding]);
  fs.writeFileSync(filePath, fileBuffer);

  return filePath;
}

export function generateString(length: number): string {
  return 'A'.repeat(length);
}
