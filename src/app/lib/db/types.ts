import { Generated, Updateable } from "kysely";

export interface Database {
  todos: TodosTable;
}

export interface TodosTable {
  id: Generated<number>;
  text: string;
  done: boolean;
}

export type TodoUpdate = Updateable<TodosTable>;
