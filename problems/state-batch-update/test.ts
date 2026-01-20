import { test, expect } from '@playwright/test';

test.describe('카운터 배치 업데이트', () => {
  test('+3 증가 버튼을 클릭하면 카운터가 3씩 증가한다', async ({ page }) => {
    await page.goto('/');

    // 초기값 확인
    await expect(page.locator('text=0').first()).toBeVisible();

    // +3 증가 버튼 클릭
    await page.click('button:has-text("+3 증가")');

    // 3이 표시되는지 확인
    await expect(page.locator('text=3').first()).toBeVisible();

    // 한 번 더 클릭
    await page.click('button:has-text("+3 증가")');

    // 6이 표시되는지 확인
    await expect(page.locator('text=6').first()).toBeVisible();
  });
});
