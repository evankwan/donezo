import React, { useState, useEffect } from "react";

import { useTodosProvider } from "../contexts/TodosProvider";

import { TodoStatus } from "../types/todo";
import type { Todo } from "../types/todo";

import "./Form.css";

const Form = () => {
  const { todos, addTodo } = useTodosProvider();
  const [todoForm, setTodoForm] = useState({
    todo: "",
  });
  const [errors, setErrors] = useState<Record<string, string | false>>({
    todo: false,
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

  const isValidInput = (val: string) => {
    return val.trim().length !== 0;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidInput(todoForm.todo)) {
      setErrors((e) => ({
        ...e,
        todo: false,
      }));
    }
    setTodoForm({
      ...todoForm,
      todo: e.target.value,
    });
  };
  const validateForm = (): boolean => {
    let isValid = true;

    if (!isValidInput(todoForm.todo)) {
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setErrors((e) => ({
        ...e,
        todo: "required",
      }));
      return;
    }
    const newTodo: Todo = {
      id: nextTodoId,
      name: todoForm.todo.trim(),
      status: TodoStatus.OPEN,
    };
    await addTodo(newTodo);
    setNextTodoId(nextTodoId + 1);
    resetTodoInput();
  };

  return (
    <div className="w-full col-span-full">
      <form className="w-full mb-4" onSubmit={handleSubmit}>
        <div className="focus-border relative w-full">
          <input
            id="todo-input"
            value={todoForm.todo}
            onChange={handleInputChange}
            className="w-full border-b-2 border-b-[#444] bg-none focus-visible:outline-none"
            placeholder="enter todo"
            required
          />
          <p className="absolute bottom-[-24px] left-0 text-[#E4493B]">
            {errors.todo}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
