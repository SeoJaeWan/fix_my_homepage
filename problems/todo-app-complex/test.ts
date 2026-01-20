import { test, expect } from '@playwright/test';

test.describe('복잡한 Todo 앱', () => {
  test('완료 버튼을 클릭하면 상태가 토글된다', async ({ page }) => {
    await page.goto('/');

    // 체크박스 클릭
    const checkbox = page.locator('text=React 공부하기').locator('..').locator('input[type="checkbox"]');
    await checkbox.click();

    // 체크 상태 확인
    await expect(checkbox).toBeChecked();
  });

  test('삭제 버튼을 클릭하면 정확한 Todo가 삭제된다', async ({ page }) => {
    await page.goto('/');

    // 초기 Todo 개수 확인
    await expect(page.locator('text=React 공부하기')).toBeVisible();

    // 'React 공부하기' 삭제
    await page.locator('text=React 공부하기').locator('..').locator('button:has-text("삭제")').click();

    // 삭제된 Todo가 사라졌는지 확인
    await expect(page.locator('text=React 공부하기')).not.toBeVisible();

    // 다른 Todo는 남아있는지 확인
    await expect(page.locator('text=프로젝트 배포하기')).toBeVisible();
  });

  test('새 할일을 추가하면 목록이 즉시 업데이트된다', async ({ page }) => {
    await page.goto('/');

    // 새 할일 추가
    await page.fill('input[placeholder*="새로운 할 일"]', '테스트 작성하기');
    await page.click('button:has-text("추가")');

    // 추가된 할일이 표시되는지 확인
    await expect(page.locator('text=테스트 작성하기')).toBeVisible();
  });
});
