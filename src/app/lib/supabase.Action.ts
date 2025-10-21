"use server";

import { Todo } from "../components/TodoApp";
import { Database, TodosTable, TodoUpdate } from "../types";
import { db } from "./database";
import { supabase } from "./supabase";

export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addTodo(text: string) {
  return await db
    .insertInto("todos")
    .values({ text, done: false })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteTodo(id: number) {
  return await db
    .deleteFrom("todos")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function editTodo(id: number, updateWith: TodoUpdate) {
  return await db
    .updateTable("todos")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}
