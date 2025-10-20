import { Todo } from "./TodoApp";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  title: string;
  todos: Todo[];
  onToggle?: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export function TodoList(props: TodoListProps) {
  const { title, todos, onToggle, onDelete, onEdit } = props;
  return (
    <div className="border border-gray-300 rounded-xl p-5 mb-5 bg-gray-50 shadow-sm w-full box-border">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <ul className="list-disc list-inside p-0 m-0">
        {/* todos配列を 未完了のリストに反映*/}
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </ul>
    </div>
  );
}
