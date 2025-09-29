import { useRef } from "react";

import Checkbox from "./Checkbox.tsx";

import { useTodosProvider } from "../contexts/TodosProvider";

import { type Todo, TodoStatus } from "../types/todo";

const TodoList = () => {
  const { todos, updateTodo } = useTodosProvider();
  const { isShowingCompletedItems } = useTodosProvider();
  const isTodoOpen = (todo: Todo) => todo.status === TodoStatus.OPEN;

  const firstCheckbox = useRef<HTMLLabelElement>(null);

  const toggleTodoStatus = async (
    idToUpdate: number,
    checked: boolean,
  ): Promise<void> => {
    const newTodos = [...todos];
    const todoIndexToUpdate = newTodos.findIndex(({ id }) => id === idToUpdate);
    newTodos[todoIndexToUpdate].status = checked
      ? TodoStatus.COMPLETED
      : TodoStatus.OPEN;
    await updateTodo(newTodos[todoIndexToUpdate]);
  };

  const focusOnFirstCheckbox = () => {
    if (firstCheckbox.current) {
      firstCheckbox.current.focus();
    }
  };

  const handleToDoStatusChange = async (
    idToUpdate: number,
    checked: boolean,
  ) => {
    await toggleTodoStatus(idToUpdate, checked);
    focusOnFirstCheckbox();
  };

  const todoListItems = todos
    .filter((todo: Todo) => (isShowingCompletedItems ? true : isTodoOpen(todo)))
    .sort((_: Todo, b: Todo) =>
      isShowingCompletedItems ? (isTodoOpen(b) ? 1 : -1) : 1,
    )
    .map((todo: Todo, index: number) => {
      return (
        <li
          key={todo.id}
          className="w-full flex flex-row gap-2 justify-start items-center"
        >
          <Checkbox
            ref={index === 0 ? firstCheckbox : null}
            className="todo-checkbox"
            checked={todo.status === TodoStatus.COMPLETED}
            onChange={(checked) => handleToDoStatusChange(todo.id, checked)}
          />
          <p className="w-full truncate">{todo.name}</p>
        </li>
      );
    });

  return <ul>{todoListItems}</ul>;
};

export default TodoList;
