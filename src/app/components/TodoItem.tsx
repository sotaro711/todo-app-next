"use client";

import { useEffect, useState } from "react";
import { Todo } from "./TodoApp";

type TodoItemProps = {
  todo: Todo;
  onToggle?: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export function TodoItem(props: TodoItemProps) {
  const { todo, onToggle, onDelete, onEdit } = props;
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  return (
    <li className="flex justify-start items-center py-1.5 border-b border-gray-200 last:border-b-0 gap-2">
      {isEditing ? (
        <div className="flex gap-2 w-full">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              onEdit(todo.id, editText);
              setEditing(false);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            保存
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <span
            className={`text-[16px] ${
              todo.done ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
          <div className="flex gap-2">
            {!todo.done && (
              <button
                onClick={() => onToggle?.(todo.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                完了
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
            >
              削除
            </button>
            <button
              onClick={() => {
                setEditing(true);
              }}
            >
              編集
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
