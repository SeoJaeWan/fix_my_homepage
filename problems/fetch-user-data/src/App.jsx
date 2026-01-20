import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 버그: async/await 없이 Promise를 직접 setUsers에 전달
    const fetchUsers = () => {
      setLoading(true);
      const data = fetch('/api/problems/fetch-user-data/users').then(res => res.json());
      setUsers(data); // 버그: Promise 객체가 그대로 저장됨
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">사용자 목록</h1>

          {loading ? (
            <p className="text-center text-gray-600">로딩 중...</p>
          ) : (
            <UserList users={users} />
          )}
        </div>
      </div>
    </div>
  );
}
