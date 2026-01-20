import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // 초기 데이터 로드
    fetch('/api/problems/todo-app-complex/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    // 버그: setTodos를 호출하지 않음
    todos.push(newTodo); // 직접 배열 변경 (React가 감지 못함)
  };

  const toggleTodo = (id) => {
    // 버그: 잘못된 id 비교 (문자열 vs 숫자)
    setTodos(todos.map(todo =>
      todo.id === String(id) // 버그: id는 숫자인데 String으로 비교
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    // 버그: filter 조건이 반대
    setTodos(todos.filter(todo => todo.id === id)); // 삭제할 것을 남김
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
