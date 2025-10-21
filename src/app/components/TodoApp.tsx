"use client";

import { useEffect, useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../lib/supabase.Action";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function TodoApp() {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      editTodo(id, { done: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, newText }: { id: number; newText: string }) =>
      editTodo(id, { text: newText }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <div className="max-w-[700px] mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* タイトル */}
      <h1 className="text-center text-2xl font-semibold mb-6">📝 Todo List</h1>
      {/* 入力場所 */}
      <TodoInput
        text={text}
        setText={setText}
        onAdd={() => {
          if (!text) return;
          addMutation.mutate(text);
          setText("");
        }}
      />
      {/* 未完了のリスト */}
      <TodoList
        title={"未完了"}
        todos={todos.filter((t) => !t.done)}
        onDelete={(id) => deleteMutation.mutate(id)}
        onToggle={(id) => toggleMutation.mutate({ id, done: true })}
        onEdit={(id, newText) => editMutation.mutate({ id, newText })}
      />
      {/* 完了のリスト */}
      <TodoList
        title={"完了"}
        todos={todos.filter((t) => t.done)}
        onDelete={(id) => deleteMutation.mutate(id)}
        onEdit={(id, newText) => editMutation.mutate({ id, newText })}
      />
    </div>
  );
}
