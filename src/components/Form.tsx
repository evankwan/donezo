import React, { useRef, useState } from "react";

import { useTodosProvider } from "../contexts/TodosProvider";

import { TodoStatus } from "../types/todo";
import type { Todo } from "../types/todo";

const Form = () => {
  const { todos, setTodos } = useTodosProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  const [nextTodoId, setNextTodoId] = useState(() => {
    if (todos.length === 0) {
      return 0;
    }
    return (todos as Todo[])[todos.length - 1].id + 1;
  });

  const resetTodoInput = () => (inputRef.current!.value = "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value) {
      return;
    }
    const newTodo: Todo = {
      id: nextTodoId,
      name: inputRef.current.value,
      status: TodoStatus.OPEN,
    };

    const newTodos: Todo[] = [...todos, newTodo];
    await setTodos(newTodos);
    setNextTodoId(nextTodoId + 1);
    resetTodoInput();
  };

  return (
    <div className="p-4 w-full col-span-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          id="todo-input"
          ref={inputRef}
          className="w-full border-b border-b-[#444] bg-none"
          placeholder="enter todo"
        />
      </form>
    </div>
  );
};

export default Form;
