import React, { createContext, useState, useContext, useEffect } from "react";

import useTodosApi from "../api/Todos";

import type { Todo, List } from "../types/todo";

export interface _TodosContextInterface {
  todos: Todo[];
  addTodo: (val: Todo) => Promise<void>;
  updateTodo: (val: Todo) => Promise<void>;
  lists: List[];
  getLists: () => Promise<List[] | undefined>;
  setLists: (val: List[]) => Promise<List[] | undefined>;
  currentList: List | undefined;
  setCurrentList: React.Dispatch<React.SetStateAction<any>>;
  isShowingCompletedItems: boolean;
  setIsShowingCompletedItems: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TodosContextValue = _TodosContextInterface;

const TodosContext: React.Context<TodosContextValue> =
  createContext<TodosContextValue>({
    todos: [],
    addTodo: async (_val: Todo) => {},
    updateTodo: async (_val: Todo) => {},
    lists: [],
    getLists: async () => undefined,
    setLists: async (_val: List[]) => undefined,
    currentList: undefined,
    setCurrentList: () => {},
    isShowingCompletedItems: false,
    setIsShowingCompletedItems: () => {},
  });

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lists, getLists, setLists, updateList } = useTodosApi();

  const addTodo = async (todo: Todo) => {
    if (!currentList) {
      return;
    }
    const newCurrentList = { ...currentList };
    newCurrentList.todos.push(todo);
    updateList(currentList.id, newCurrentList);
  };

  const updateTodo = async (todo: Todo) => {
    if (!currentList) {
      return;
    }
    const newTodos = [...todos];
    const indexToUpdate = newTodos.findIndex(({ id }) => id === todo.id);
    newTodos[indexToUpdate] = todo;
    updateList(currentList.id, {
      ...currentList,
      todos: newTodos,
    });
  };

  useEffect(() => {
    getLists();
  }, []);

  const [currentList, setCurrentList] = useState<List>();
  useEffect(() => {
    if (!currentList) {
      setCurrentList(lists[0]);
    }
  }, [lists]);

  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    if (!currentList) {
      return;
    }

    setTodos(currentList.todos);
  }, [currentList]);

  const [isShowingCompletedItems, setIsShowingCompletedItems] = useState(false);

  return (
    <TodosContext
      value={{
        todos,
        addTodo,
        updateTodo,
        currentList,
        lists,
        getLists,
        setLists,
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
