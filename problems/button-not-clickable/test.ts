import { test, expect } from '@playwright/test';

test.describe('클릭되지 않는 버튼', () => {
  test('구매하기 버튼을 클릭하면 구매 완료 메시지가 표시된다', async ({ page }) => {
    await page.goto('/');

    // 구매하기 버튼 클릭
    await page.click('button:has-text("구매하기")');

    // 구매 완료 메시지 확인
    await expect(page.locator('text=구매 완료!')).toBeVisible();
  });
});
