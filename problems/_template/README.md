# 문제 작성 가이드

## 폴더 구조

문제 폴더는 자유롭게 구성할 수 있습니다. 다음은 예시입니다:

### 기본 구조
```
problem-id/
├── problem.json       # 필수: 문제 메타데이터
├── src/              # 필수: 소스 코드
│   └── App.jsx       # 필수: 루트 컴포넌트
└── test.ts           # 선택: 테스트 코드
```

### 복잡한 구조 (자유롭게 구성 가능)
```
problem-id/
├── problem.json
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useCustomHook.js
│   ├── styles/
│   │   └── App.css
│   └── tailwind.config.js  # 커스텀 Tailwind 설정
├── api/                    # API 더미 데이터
│   ├── users.json
│   └── products.json
└── test.ts
```

## API 더미 데이터 사용법

### 1. api/ 폴더에 JSON 파일 생성

```json
// api/users.json
[
  { "id": 1, "name": "John", "email": "john@example.com" },
  { "id": 2, "name": "Jane", "email": "jane@example.com" }
]
```

### 2. 컴포넌트에서 fetch

```jsx
// src/App.jsx
useEffect(() => {
  fetch(`/api/problems/${problemId}/users`)
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

## Tailwind 커스텀 설정

`src/tailwind.config.js` 파일을 생성하면 Sandbox에서 자동으로 적용됩니다:

```javascript
// src/tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
    },
  },
};
```

## problem.json 스키마

```typescript
interface Problem {
  id: string;           // kebab-case
  title: string;        // 한글 제목
  situation: string;    // 문제 상황 설명
  goals: string[];      // 달성 목표 리스트
  environment: {
    type: 'react';
    dependencies: Record<string, string>;
  };
  author: {
    github: string;     // GitHub username
  };
}
```

## 주의사항

1. `problem.json`의 `id`는 폴더명과 일치해야 합니다
2. `src/App.jsx`는 반드시 존재해야 합니다
3. API 더미 데이터는 `api/` 폴더에 JSON 형식으로 저장합니다
4. 테스트 코드는 선택사항이지만 권장됩니다
