import React from "react";

import Checkbox from "./Checkbox.tsx";

import { useCurrentListProvider } from "../contexts/CurrentListProvider"

import { type Todo, TodoStatus } from "../types/todo";

type Props = {
  todos: Todo[];
  setTodos: (val: Todo[]) => Todo[] | undefined;
};

const TodoList: React.FC<Props> = (props: Props) => {
  const { isShowingCompletedItems } = useCurrentListProvider()
  const isTodoOpen = (todo: Todo) => todo.status === TodoStatus.OPEN;

  const toggleTodoStatus = (idToUpdate: number, checked: boolean): void => {
    const newTodos = [...props.todos];
    const todoIndexToUpdate = newTodos.findIndex(({ id }) => id === idToUpdate);
    newTodos[todoIndexToUpdate].status = checked
      ? TodoStatus.COMPLETED
      : TodoStatus.OPEN;
    props.setTodos(newTodos);
  };

  const todoListItems = props.todos
    .filter((todo) => isShowingCompletedItems ? true : isTodoOpen(todo))
    .sort((_, b) => isShowingCompletedItems ? (isTodoOpen(b) ? 1 : -1) : 1)
    .map((todo) => {
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
