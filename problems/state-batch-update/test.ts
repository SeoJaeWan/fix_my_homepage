import { describe, it, expect, act, waitFor } from '@fixmyhome/test-runner';

describe('카운터 배치 업데이트', () => {
  it('+3 증가 버튼을 클릭하면 카운터가 3씩 증가한다', async () => {
    // 초기값 확인 - 카운터 숫자가 있는 div 찾기
    const getCounterValue = () => {
      const counterElement = document.querySelector('.text-6xl');
      return counterElement?.textContent?.trim();
    };

    expect(getCounterValue()).toBe('0');

    // +3 증가 버튼 찾기
    const incrementButton = Array.from(document.querySelectorAll('button'))
      .find(btn => btn.textContent?.includes('+3 증가'));

    expect(incrementButton).toBeTruthy();

    // act를 사용해서 React 업데이트 보장
    await act(async () => {
      incrementButton?.click();
    });

    // waitFor로 값이 변경될 때까지 대기
    await waitFor(() => {
      expect(getCounterValue()).toBe('3');
    });

    // 한 번 더 클릭
    await act(async () => {
      incrementButton?.click();
    });

    // 다시 대기 후 6 확인
    await waitFor(() => {
      expect(getCounterValue()).toBe('6');
    });
  });
});
