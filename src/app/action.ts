"use server";

import { Todo } from "./components/TodoApp";
import { TodoUpdate } from "./lib/db/types";
import { db } from "./lib/db/kysely";
import { supabase } from "./lib/db/supabase";

export async function getTodos(): Promise<Todo[]> {
  return await db.selectFrom("todos").selectAll().execute();
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
    .returningAll()
    .executeTakeFirstOrThrow();
}
