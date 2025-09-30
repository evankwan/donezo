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

  // this could be fragile if the todos state ever excludes completed todos, this might be better from the provider instead so it's coming closer from the source and can be easily updated if the todos state calc ever changes, but this works for now
  // done in a function instead of a state so it always accesses the latest todo state to determine, preventing this number from getting out of sync. this could cause some problems if the todos state ever gets sorted (but it probably should never get sorted in place)
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

    // yes, there's only one input, but this is how the form would be validated if there were multiple, so i did the validation like this for extensibility
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
