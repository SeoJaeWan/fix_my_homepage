import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoList from './components/TodoList';
import './styles/App.css';

export default function App() {
  const [input, setInput] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            📝 Todo App
          </h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="새로운 할 일을 입력하세요..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                추가
              </button>
            </div>
          </form>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <div className="mt-6 text-center text-sm text-gray-600">
            총 {todos.length}개 | 완료 {todos.filter(t => t.completed).length}개
          </div>
        </div>
      </div>
    </div>
  );
}
