import { test, expect, type Page } from '@playwright/test';

test.describe('Contacts Tests', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveURL(/\/contacts-view$/);
  });

  test('should go back', async ({page}) => {
    await page.goto('http://localhost:4200');
    await page.getByText('Create new').click();
    await expect(page).toHaveURL(/\/contact/);
    await page.getByText('Back').click();
    await expect(page).toHaveURL(/\/contacts-view$/);
  });

  test('should create contact', async ({page}) => {
    const randomString = Math.random().toString(36).substring(2,7);
    const firstName = randomString + '_first_name';

    await page.goto('http://localhost:4200');
    await page.getByText('Create new').click();
    await expect(page).toHaveURL(/\/contact/);
    await page.locator('body > app-root > app-contact > div > form > div > div > div:nth-child(1) > input').fill(firstName);
    await page.locator('body > app-root > app-contact > div > form > div > div > div:nth-child(2) > input').fill('Contact surname');
    await page.locator('body > app-root > app-contact > div > form > div > div > div:nth-child(3) > input').fill('Contact address');
    await page.locator('body > app-root > app-contact > div > form > div > div > div:nth-child(4) > input').fill('0888888888');
    await page.locator('body > app-root > app-contact > div > form > div > div > div:nth-child(5) > input').fill('BG80BNBG96611020345678');
    await page.getByText('Create').click();
    await page.waitForTimeout(15000);
    await expect(page).toHaveURL(/\/contacts-view$/);
    const element = await page.getByText(firstName);
    await expect(element !== undefined ).toBeTruthy();
  });
});