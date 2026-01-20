import { test, expect } from '@playwright/test';

test.describe('사용자 데이터 Fetch', () => {
  test('사용자 목록이 올바르게 표시된다', async ({ page }) => {
    await page.goto('/');

    // 로딩 완료까지 대기
    await page.waitForSelector('text=김철수', { timeout: 5000 });

    // 사용자 정보 확인
    await expect(page.locator('text=김철수')).toBeVisible();
    await expect(page.locator('text=chulsoo@example.com')).toBeVisible();
    await expect(page.locator('text=이영희')).toBeVisible();
    await expect(page.locator('text=박민수')).toBeVisible();

    // [object Promise] 텍스트가 없는지 확인
    await expect(page.locator('text=[object Promise]')).not.toBeVisible();
  });
});
