import { describe, it, expect } from '@fixmyhome/test-runner';

describe('카운터 배치 업데이트', () => {
  it('+3 증가 버튼을 클릭하면 카운터가 3씩 증가한다', () => {
    // 초기값 확인 - 카운터 숫자가 있는 div 찾기
    const getCounterValue = () => {
      const counterElement = document.querySelector('.text-6xl');
      return counterElement?.textContent?.trim();
    };

    expect(getCounterValue()).toBe('0');

    // +3 증가 버튼 찾기 및 클릭
    const incrementButton = Array.from(document.querySelectorAll('button'))
      .find(btn => btn.textContent?.includes('+3 증가'));

    expect(incrementButton).toBeTruthy();
    incrementButton?.click();

    // React state 업데이트 대기 후 3 확인
    setTimeout(() => {
      expect(getCounterValue()).toBe('3');

      // 한 번 더 클릭
      incrementButton?.click();

      // 다시 대기 후 6 확인
      setTimeout(() => {
        expect(getCounterValue()).toBe('6');
      }, 100);
    }, 100);
  });
});
