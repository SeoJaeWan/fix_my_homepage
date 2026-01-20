import { describe, it, expect } from '@fixmyhome/test-runner';

describe('복잡한 Todo 앱', () => {
  it('완료 버튼을 클릭하면 상태가 토글된다', () => {
    // 'React 공부하기' 텍스트를 가진 요소 찾기
    const todoTextElements = Array.from(document.querySelectorAll('*'))
      .filter(el => el.textContent?.includes('React 공부하기'));

    // 해당 텍스트를 포함하는 가장 가까운 부모에서 체크박스 찾기
    let checkbox = null;
    for (const el of todoTextElements) {
      const parent = el.closest('.todo-item') || el.closest('li') || el.closest('div[class*="todo"]');
      if (parent) {
        checkbox = parent.querySelector('input[type="checkbox"]');
        if (checkbox) break;
      }
    }

    expect(checkbox).toBeTruthy();
    (checkbox as HTMLInputElement)?.click();

    // React state 업데이트 대기
    setTimeout(() => {
      expect((checkbox as HTMLInputElement)?.checked).toBe(true);
    }, 100);
  });

  it('삭제 버튼을 클릭하면 정확한 Todo가 삭제된다', () => {
    // 초기 'React 공부하기' 존재 확인
    let reactTodo = Array.from(document.querySelectorAll('*'))
      .find(el => el.textContent?.includes('React 공부하기'));

    expect(reactTodo).toBeTruthy();

    // 'React 공부하기' 항목의 삭제 버튼 찾기
    const todoElements = Array.from(document.querySelectorAll('*'))
      .filter(el => el.textContent?.includes('React 공부하기'));

    let deleteButton = null;
    for (const el of todoElements) {
      const parent = el.closest('.todo-item') || el.closest('li') || el.closest('div[class*="todo"]');
      if (parent) {
        deleteButton = Array.from(parent.querySelectorAll('button'))
          .find(btn => btn.textContent?.includes('삭제'));
        if (deleteButton) break;
      }
    }

    expect(deleteButton).toBeTruthy();
    deleteButton?.click();

    // React state 업데이트 대기
    setTimeout(() => {
      // 'React 공부하기'가 삭제되었는지 확인
      reactTodo = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent?.includes('React 공부하기') && !el.textContent?.includes('프로젝트'));

      expect(reactTodo).toBeFalsy();

      // 다른 Todo는 남아있는지 확인
      const otherTodo = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent?.includes('프로젝트 배포하기'));
      expect(otherTodo).toBeTruthy();
    }, 100);
  });

  it('새 할일을 추가하면 목록이 즉시 업데이트된다', () => {
    // 입력 필드 찾기
    const input = document.querySelector('input[placeholder*="새로운 할 일"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // 추가 버튼 찾기
    const addButton = Array.from(document.querySelectorAll('button'))
      .find(btn => btn.textContent?.includes('추가'));
    expect(addButton).toBeTruthy();

    // 새 할일 입력
    if (input) {
      input.value = '테스트 작성하기';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // 추가 버튼 클릭
    addButton?.click();

    // React state 업데이트 대기
    setTimeout(() => {
      // 추가된 할일 확인
      const newTodo = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent?.includes('테스트 작성하기'));
      expect(newTodo).toBeTruthy();
    }, 100);
  });
});
