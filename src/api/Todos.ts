import useLocalStorage from "../hooks/useLocalStorage";

import { TODO_STORAGE_KEY } from "../utils";

import type { Todo } from "../types/todo";

export default function useTodosApi() {
  const [todos, _setTodos, _getTodos] = useLocalStorage<Todo[]>(
    TODO_STORAGE_KEY,
    [],
  );

  const getTodos = async () => {
    console.log("from api", _getTodos(), todos);
    return _getTodos();
  };

  const setTodos = async (value: Todo[]) => {
    return _setTodos(value);
  };

  return {
    todos,
    getTodos,
    setTodos,
  };
}
