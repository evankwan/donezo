import React, { useState, useRef } from "react";

import TodoList from "./components/TodoList";

import { TodoStatus } from "./types/todo";
import type { Todo } from "./types/todo";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([] as Todo[]);
  const [nextTodoId, setNextTodoId] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetTodoInput = () => (inputRef.current!.value = "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value) {
      return;
    }
    const newTodo: Todo = {
      id: nextTodoId,
      name: inputRef.current.value,
      status: TodoStatus.OPEN,
    };

    setTodos((state) => {
      return [...state, newTodo];
    });
    setNextTodoId(nextTodoId + 1);
    resetTodoInput();
  };
  return (
    <>
      <div className="w-full h-full grid grid-cols-1 gap-4">
        <div className="p-4 col-span-full">
          <h1 className="text-2xl font-bold">donezo</h1>
        </div>
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
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;
