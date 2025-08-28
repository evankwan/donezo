import Checkbox from "./Checkbox.tsx";

import { useTodosProvider } from "../contexts/TodosProvider";

import { type Todo, TodoStatus } from "../types/todo";

const TodoList = () => {
  const { todos, setTodos } = useTodosProvider();
  const { isShowingCompletedItems } = useTodosProvider();
  const isTodoOpen = (todo: Todo) => todo.status === TodoStatus.OPEN;

  const toggleTodoStatus = async (
    idToUpdate: number,
    checked: boolean,
  ): Promise<void> => {
    const newTodos = [...todos];
    const todoIndexToUpdate = newTodos.findIndex(({ id }) => id === idToUpdate);
    newTodos[todoIndexToUpdate].status = checked
      ? TodoStatus.COMPLETED
      : TodoStatus.OPEN;
    await setTodos(newTodos);
  };

  const todoListItems = todos
    .filter((todo: Todo) => (isShowingCompletedItems ? true : isTodoOpen(todo)))
    .sort((_: Todo, b: Todo) =>
      isShowingCompletedItems ? (isTodoOpen(b) ? 1 : -1) : 1,
    )
    .map((todo: Todo) => {
      return (
        <li
          key={todo.id}
          className="w-full flex flex-row gap-2 justify-start items-center"
        >
          <Checkbox
            checked={todo.status === TodoStatus.COMPLETED}
            onChange={(checked) => toggleTodoStatus(todo.id, checked)}
          />
          <p className="w-full truncate">{todo.name}</p>
        </li>
      );
    });

  return <ul>{todoListItems}</ul>;
};

export default TodoList;
