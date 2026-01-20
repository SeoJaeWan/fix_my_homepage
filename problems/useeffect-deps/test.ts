import { test, expect } from '@playwright/test';

test.describe('useEffect 의존성 배열', () => {
  test('검색어를 입력하면 실시간으로 결과가 업데이트된다', async ({ page }) => {
    await page.goto('/');

    // 초기 상태: 모든 상품 표시
    await expect(page.locator('text=노트북')).toBeVisible();

    // '노트'로 검색
    await page.fill('input[placeholder*="상품 이름"]', '노트');

    // '노트북'만 표시되어야 함
    await expect(page.locator('text=노트북')).toBeVisible();
    await expect(page.locator('text=마우스')).not.toBeVisible();

    // '의자'로 검색
    await page.fill('input[placeholder*="상품 이름"]', '의자');

    // '의자'만 표시되어야 함
    await expect(page.locator('text=의자')).toBeVisible();
    await expect(page.locator('text=노트북')).not.toBeVisible();
  });
});
