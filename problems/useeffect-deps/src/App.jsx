import React, { useState, useEffect } from 'react';

const MOCK_PRODUCTS = [
  { id: 1, name: '노트북', category: '전자기기' },
  { id: 2, name: '마우스', category: '전자기기' },
  { id: 3, name: '키보드', category: '전자기기' },
  { id: 4, name: '모니터', category: '전자기기' },
  { id: 5, name: '책상', category: '가구' },
  { id: 6, name: '의자', category: '가구' },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // 버그: 의존성 배열이 비어있어서 searchTerm이 변경되어도 재실행되지 않음
  useEffect(() => {
    const filtered = MOCK_PRODUCTS.filter(product =>
      product.name.includes(searchTerm)
    );
    setResults(filtered);
  }, []); // 버그: searchTerm을 의존성 배열에 추가해야 함

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">상품 검색</h1>

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="상품 이름을 입력하세요..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-4">
            검색어: <span className="font-semibold">{searchTerm || '(없음)'}</span>
          </p>

          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map(product => (
                <li
                  key={product.id}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <span className="font-semibold">{product.name}</span>
                  <span className="text-sm text-gray-600 ml-2">({product.category})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">검색 결과가 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
}
