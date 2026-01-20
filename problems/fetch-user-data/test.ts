import { describe, it, expect } from '@fixmyhome/test-runner';

describe('사용자 데이터 Fetch', () => {
  it('사용자 목록이 올바르게 표시된다', () => {
    // 로딩 완료까지 대기 (최대 5초)
    const checkUsers = () => {
      const kimChulsu = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent?.includes('김철수'));

      if (kimChulsu) {
        // 모든 사용자 정보 확인
        const chulsooEmail = Array.from(document.querySelectorAll('*'))
          .find(el => el.textContent?.includes('chulsoo@example.com'));
        const leeYounghee = Array.from(document.querySelectorAll('*'))
          .find(el => el.textContent?.includes('이영희'));
        const parkMinsu = Array.from(document.querySelectorAll('*'))
          .find(el => el.textContent?.includes('박민수'));

        expect(kimChulsu).toBeTruthy();
        expect(chulsooEmail).toBeTruthy();
        expect(leeYounghee).toBeTruthy();
        expect(parkMinsu).toBeTruthy();

        // [object Promise] 텍스트가 없는지 확인
        const promiseText = Array.from(document.querySelectorAll('*'))
          .find(el => el.textContent?.includes('[object Promise]'));
        expect(promiseText).toBeFalsy();
      } else {
        // 아직 로딩 중이면 다시 시도
        setTimeout(checkUsers, 100);
      }
    };

    // 초기 대기 후 확인 시작
    setTimeout(checkUsers, 100);
  });
});
