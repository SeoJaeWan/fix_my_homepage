import React from 'react';

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p className="text-gray-500 text-center py-8">사용자가 없습니다</p>;
  }

  return (
    <div className="grid gap-4">
      {users.map(user => (
        <div
          key={user.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{user.role}</p>
              <p className="text-sm text-gray-500">{user.age}세</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
