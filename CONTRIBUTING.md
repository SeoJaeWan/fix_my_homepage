# 문제 기여 가이드

Fix My Homepage에 문제를 기여해주셔서 감사합니다!

## 문제 작성 절차

### 1. 레포지토리 Fork 및 Clone

```bash
git clone https://github.com/YOUR_USERNAME/fix_my_homepage.git
cd fix_my_homepage
```

### 2. 새 브랜치 생성

```bash
git checkout -b problem/your-problem-name
```

### 3. 문제 폴더 생성

`problems/_template/` 폴더를 복사하여 새 문제 폴더를 만듭니다:

```bash
cp -r problems/_template problems/your-problem-id
```

폴더명은 kebab-case를 사용합니다 (예: `button-not-clickable`)

### 4. problem.json 작성

```json
{
  "id": "your-problem-id",
  "title": "문제 제목 (한글)",
  "situation": "사용자가 처한 상황을 구체적으로 설명합니다.",
  "goals": [
    "달성해야 할 목표 1",
    "달성해야 할 목표 2"
  ],
  "environment": {
    "type": "react",
    "dependencies": {
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
    }
  },
  "author": {
    "github": "your-github-username"
  }
}
```

**중요:** `id` 필드는 폴더명과 정확히 일치해야 합니다.

### 5. 버그가 있는 코드 작성

`src/App.jsx`에 문제가 되는 코드를 작성합니다. 다음 원칙을 따라주세요:

- **실제 상황을 반영**: 실무에서 발생할 수 있는 버그
- **단일 개념**: 한 문제에 하나의 주요 개념
- **명확한 증상**: 버그 증상이 명확해야 함
- **학습 가치**: 배울 만한 가치가 있는 버그

#### 폴더 구조 (자유롭게 구성 가능)

```
your-problem-id/
├── problem.json
├── src/
│   ├── App.jsx              # 필수
│   ├── components/          # 선택
│   ├── hooks/               # 선택
│   ├── styles/              # 선택
│   └── tailwind.config.js   # 선택 - 커스텀 Tailwind 설정
├── api/                     # 선택 - API 더미 데이터
│   ├── users.json
│   └── products.json
└── test.ts                  # 선택 - 테스트 시나리오
```

### 6. API 더미 데이터 (선택)

API 통신이 필요한 문제는 `api/` 폴더에 JSON 파일을 생성합니다:

```
api/
├── users.json
└── products.json
```

#### 사용 예시

```jsx
// src/App.jsx
useEffect(() => {
  // problemId는 자동으로 주입됨
  fetch(`/api/problems/${problemId}/users`)
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

Sandbox에서 `/api/problems/{problemId}/{filename}` 형식으로 자동 제공됩니다.

### 7. Tailwind 커스텀 설정 (선택)

커스텀 Tailwind 테마가 필요한 경우 `src/tailwind.config.js`를 생성합니다:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
};
```

이 설정은 Sandbox에서 자동으로 적용됩니다.

### 8. 테스트 작성 (권장)

`test.ts`에 Playwright 테스트를 작성합니다:

```typescript
import { test, expect } from '@playwright/test';

test.describe('문제 제목', () => {
  test('목표 달성 테스트', async ({ page }) => {
    await page.goto('/');

    // 테스트 시나리오
    await page.click('button:has-text("클릭")');
    await expect(page.locator('.success')).toBeVisible();
  });
});
```

### 9. 커밋 및 Push

```bash
git add .
git commit -m "feat: Add {문제 제목}"
git push origin problem/your-problem-name
```

### 10. Pull Request 생성

GitHub에서 Pull Request를 생성하고 다음 정보를 포함합니다:

- 문제 제목 및 설명
- 어떤 개념을 다루는지
- 버그의 원인과 해결 방법 (스포일러 주의!)

## 좋은 문제의 조건

1. **실무 연관성**: 실제로 발생할 수 있는 버그
2. **학습 가치**: 중요한 개념을 다룸
3. **명확성**: 버그 증상이 명확함
4. **해결 가능성**: 적절한 난이도
5. **독립성**: 다른 문제에 의존하지 않음

## 문제 카테고리

- CSS/Tailwind 관련
- React 상태 관리
- React Hooks
- 비동기 처리
- 이벤트 처리
- 성능 최적화
- 접근성

## 주의사항

- `problem.json`의 `id`는 폴더명과 일치해야 함
- `src/App.jsx`는 반드시 존재해야 함
- API 더미 데이터는 JSON 형식으로만 제공
- 외부 라이브러리는 가급적 최소화
- 한글로 작성 (코드 주석 제외)

## 문의

문제가 있거나 질문이 있으면 Issue를 생성해주세요.
