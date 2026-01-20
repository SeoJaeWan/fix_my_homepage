import { describe, it, expect } from '@fixmyhome/test-runner';

describe('클릭되지 않는 버튼', () => {
  it('구매하기 버튼을 클릭하면 구매 완료 메시지가 표시된다', () => {
    // 구매하기 버튼 찾기
    const button = Array.from(document.querySelectorAll('button'))
      .find(btn => btn.textContent?.includes('구매하기'));

    expect(button).toBeTruthy();
    button?.click();

    // React state 업데이트 대기
    setTimeout(() => {
      // 구매 완료 메시지 확인
      const successMessage = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent?.includes('구매 완료!'));
      expect(successMessage).toBeTruthy();
    }, 100);
  });
});
