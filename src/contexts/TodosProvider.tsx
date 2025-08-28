import React, { createContext, useState, useContext } from "react";

import useTodosApi from "../api/Todos";

import type { Todo } from "../types/todo";

export interface _TodosContextInterface {
  todos: Todo[];
  getTodos: () => Promise<Todo[] | undefined>;
  setTodos: (val: Todo[]) => Promise<Todo[] | undefined>;
  currentList: any;
  setCurrentList: React.Dispatch<React.SetStateAction<any>>;
  isShowingCompletedItems: boolean;
  setIsShowingCompletedItems: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TodosContextValue = _TodosContextInterface;

const TodosContext: React.Context<TodosContextValue> =
  createContext<TodosContextValue>({
    todos: [],
    getTodos: async () => undefined,
    setTodos: async (_val: Todo[]) => undefined,
    currentList: null,
    setCurrentList: () => {},
    isShowingCompletedItems: false,
    setIsShowingCompletedItems: () => {},
  });

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentList, setCurrentList] = useState("");
  const [isShowingCompletedItems, setIsShowingCompletedItems] = useState(false);
  const { todos, getTodos, setTodos } = useTodosApi();

  return (
    <TodosContext
      value={{
        todos,
        getTodos,
        setTodos,
        currentList,
        setCurrentList,
        isShowingCompletedItems,
        setIsShowingCompletedItems,
      }}
    >
      {children}
    </TodosContext>
  );
};

export const useTodosProvider = () => useContext(TodosContext);
export default TodosProvider;
