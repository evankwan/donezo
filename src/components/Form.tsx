import React, { useState, useEffect } from "react";

import { useTodosProvider } from "../contexts/TodosProvider";

import { TodoStatus } from "../types/todo";
import type { Todo } from "../types/todo";

const Form = () => {
  const { todos, addTodo } = useTodosProvider();
  const [todoForm, setTodoForm] = useState({
    todo: "",
  });

  const resetTodoInput = () => setTodoForm({ todo: "" });

  const calculateNextTodoId = () => {
    if (todos.length === 0) {
      return 0;
    }
    return (todos as Todo[])[todos.length - 1].id + 1;
  };
  const [nextTodoId, setNextTodoId] = useState(calculateNextTodoId());
  useEffect(() => {
    setNextTodoId(calculateNextTodoId());
  }, [todos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: nextTodoId,
      name: todoForm.todo,
      status: TodoStatus.OPEN,
    };
    await addTodo(newTodo);
    setNextTodoId(nextTodoId + 1);
    resetTodoInput();
  };

  return (
    <div className="p-4 w-full col-span-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          id="todo-input"
          value={todoForm.todo}
          onChange={(e) => {
            setTodoForm({
              ...todoForm,
              todo: e.target.value,
            });
          }}
          className="w-full border-b border-b-[#444] bg-none"
          placeholder="enter todo"
        />
      </form>
    </div>
  );
};

export default Form;
