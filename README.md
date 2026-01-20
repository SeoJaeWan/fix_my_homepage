# Fix My Homepage - 문제 저장소

이 레포지토리는 [Fix My Homepage](https://github.com/SeoJaeWan/fix-my-homepage) 프로젝트의 문제 데이터를 관리합니다.

## 구조

```
problems/
├── _template/              # 문제 작성 템플릿
├── button-not-clickable/   # 개별 문제 폴더
│   ├── problem.json        # 문제 메타데이터
│   ├── src/                # 소스 코드
│   │   └── App.jsx
│   ├── api/                # API 더미 데이터 (선택)
│   └── test.ts             # 테스트 (선택)
└── index.json              # 전체 문제 인덱스 (자동 생성)
```

## 문제 작성하기

1. `problems/_template/` 폴더를 복사하여 새 문제 폴더 생성
2. `problem.json`에 문제 정보 작성
3. `src/App.jsx`에 버그가 있는 코드 작성
4. `test.ts`에 테스트 시나리오 작성 (선택)
5. Pull Request 생성

자세한 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 문제 스키마

```typescript
interface Problem {
  id: string;           // kebab-case 형식
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

## API 더미 데이터

`api/` 폴더에 JSON 파일을 생성하면 Sandbox에서 자동으로 제공됩니다:

```javascript
// 문제에서 사용
fetch(`/api/problems/${problemId}/users`)
  .then(res => res.json())
  .then(data => console.log(data));
```

## Tailwind 커스텀 설정

`src/tailwind.config.js`를 생성하면 Sandbox에서 자동으로 적용됩니다:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
      },
    },
  },
};
```

## 라이센스

MIT
