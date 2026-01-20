import { test, expect } from '@playwright/test';

test.describe('Problem Template', () => {
  test('목표 달성 테스트', async ({ page }) => {
    // 테스트 시나리오 작성
    await page.goto('/');

    // 예시: 버튼 클릭 테스트
    // await page.click('button');
    // await expect(page.locator('.success')).toBeVisible();
  });
});
