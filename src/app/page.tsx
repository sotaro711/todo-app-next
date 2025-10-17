"use client";

import React, { useState } from "react";
import { TodoList } from "./components/TodoList";
import { TodoInput } from "./components/TodoInput";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // 追加ボタンを押したらtodos配列が更新
  function addTodo() {
    if (text === "") return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  }

  // 削除ボタン実装
  function deleteTodo(id: number) {
    setTodos(
      todos.filter((t) => {
        return t.id !== id;
      })
    );
  }

  // チェックしたらtrueに切り替え
  function toggleTodo(id: number) {
    const newTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, done: !todo.done } : todo;
    });
    setTodos(newTodos);
  }

  // 編集機能
  function handleEdit(id: number, newText: string) {
    setTodos(
      todos.map((t) => {
        return t.id === id ? { ...t, text: newText } : t;
      })
    );
  }

  return (
    <div className="max-w-[700px] mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* タイトル */}
      <h1 className="text-center text-2xl font-semibold mb-6">📝 Todo List</h1>
      {/* 入力場所 */}
      <TodoInput text={text} setText={setText} onAdd={addTodo} />
      {/* 未完了のリスト */}
      <TodoList
        title={"未完了"}
        todos={todos.filter((t) => !t.done)}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={handleEdit}
      />
      {/* 完了のリスト */}
      <TodoList
        title={"完了"}
        todos={todos.filter((t) => t.done)}
        onDelete={deleteTodo}
        onEdit={handleEdit}
      />
    </div>
  );
}
