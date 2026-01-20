import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between ${todo.completed ? 'completed' : ''}`}>
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer"
        />
        <span
          className={`ml-3 text-lg ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition"
      >
        삭제
      </button>
    </div>
  );
}
