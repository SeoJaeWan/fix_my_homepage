import { describe, it, expect } from '@fixmyhome/test-runner';

describe('useEffect 의존성 배열', () => {
  it('검색어를 입력하면 실시간으로 결과가 업데이트된다', () => {
    // 초기 상태: 모든 상품 표시
    const initialLaptop = Array.from(document.querySelectorAll('*'))
      .find(el => el.textContent === '노트북' || (el.textContent?.includes('노트북') && el.textContent.length < 20));
    expect(initialLaptop).toBeTruthy();

    // 입력 필드 찾기
    const input = document.querySelector('input[placeholder*="상품 이름"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // '노트'로 검색
    if (input) {
      input.value = '노트';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // React state 업데이트 대기
    setTimeout(() => {
      // '노트북'만 표시되어야 함
      const laptop = Array.from(document.querySelectorAll('li, .product-item, [class*="product"]'))
        .find(el => el.textContent?.includes('노트북'));
      const mouse = Array.from(document.querySelectorAll('li, .product-item, [class*="product"]'))
        .find(el => el.textContent?.includes('마우스') && !el.textContent?.includes('노트북'));

      expect(laptop).toBeTruthy();
      expect(mouse).toBeFalsy();

      // '의자'로 검색
      if (input) {
        input.value = '의자';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // 다시 React state 업데이트 대기
      setTimeout(() => {
        // '의자'만 표시되어야 함
        const chair = Array.from(document.querySelectorAll('li, .product-item, [class*="product"]'))
          .find(el => el.textContent?.includes('의자'));
        const laptopAgain = Array.from(document.querySelectorAll('li, .product-item, [class*="product"]'))
          .find(el => el.textContent?.includes('노트북'));

        expect(chair).toBeTruthy();
        expect(laptopAgain).toBeFalsy();
      }, 100);
    }, 100);
  });
});
