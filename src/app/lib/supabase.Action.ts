import { Todo } from "../components/TodoApp";
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
  const { error } = await supabase.from("todos").insert({ text, done: false });
  if (error) throw error;
}

export async function deleteTodo(id: number) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleTodo(id: number, done: boolean) {
  const { error } = await supabase.from("todos").update({ done }).eq("id", id);
  if (error) throw error;
}

export async function editTodo(id: number, newText: string) {
  const { error } = await supabase
    .from("todos")
    .update({ text: newText })
    .eq("id", id)
    .select();
  if (error) throw error;
}
