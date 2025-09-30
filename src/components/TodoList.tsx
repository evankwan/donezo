import { useRef, useState } from "react";

import Checkbox from "./Checkbox.tsx";

import { useTodosProvider } from "../contexts/TodosProvider";

import { type Todo, TodoStatus } from "../types/todo";

import { sleep } from "../utils";

import "./TodoList.css";

const ANIMATION_LENGTH_IN_MS = 500;

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

  const [animationMap, setAnimationMap] = useState<Record<number, boolean>>({});

  const runCompletedAnimation = async (id: number) => {
    setAnimationMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    await sleep(ANIMATION_LENGTH_IN_MS);
  };
  const removeCompletedAnimation = async (id: number) => {
    setAnimationMap((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    await sleep(ANIMATION_LENGTH_IN_MS);
  };
  const handleToDoStatusChange = async (
    idToUpdate: number,
    checked: boolean,
  ) => {
    if (checked) {
      await runCompletedAnimation(idToUpdate);
      await toggleTodoStatus(idToUpdate, checked);
    } else {
      // reverse the order so that we can smoothly run the undoing animation
      await toggleTodoStatus(idToUpdate, checked);
      await removeCompletedAnimation(idToUpdate);
    }
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
          className={`w-full flex flex-row gap-2 justify-start items-center todo-item relative ${(animationMap[todo.id] || todo.status === TodoStatus.COMPLETED) && "checked"}`}
        >
          <Checkbox
            ref={index === 0 ? firstCheckbox : null}
            className="todo-checkbox"
            checked={
              animationMap[todo.id] || todo.status === TodoStatus.COMPLETED
            }
            onChange={(checked) => handleToDoStatusChange(todo.id, checked)}
          />
          <p className="w-full truncate todo-text">{todo.name}</p>
        </li>
      );
    });

  return <ul>{todoListItems}</ul>;
};

export default TodoList;
