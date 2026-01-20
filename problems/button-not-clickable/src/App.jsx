import React, { useState } from 'react';

export default function App() {
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    setPurchased(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
            alt="헤드폰"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          {/* 이미지 위에 오버레이 - z-index 문제 발생 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
        </div>

        <h1 className="text-2xl font-bold mb-2">프리미엄 노이즈 캔슬링 헤드폰</h1>
        <p className="text-gray-600 mb-4">최고급 음질과 편안한 착용감을 경험하세요.</p>
        <p className="text-3xl font-bold text-blue-600 mb-6">₩299,000</p>

        {purchased ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
            ✅ 구매 완료!
          </div>
        ) : (
          <button
            onClick={handlePurchase}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition relative"
          >
            구매하기
          </button>
        )}
      </div>
    </div>
  );
}
