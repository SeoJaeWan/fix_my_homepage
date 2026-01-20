import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleIncrementThree = () => {
    // 버그: setState 배치 업데이트로 인해 3번 호출해도 1만 증가
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          카운터 앱
        </h1>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-8">
          <p className="text-6xl font-bold text-center text-purple-600">
            {count}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleIncrementThree}
            className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            +3 증가
          </button>

          <button
            onClick={() => setCount(0)}
            className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 transition"
          >
            초기화
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          '+3 증가' 버튼을 누르면 3씩 증가해야 합니다
        </p>
      </div>
    </div>
  );
}
