import { useState } from "react";

import CurrentListProvider from "./contexts/CurrentListProvider";

import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

import useLocalStorage from "./hooks/useLocalStorage";

import { TODO_STORAGE_KEY } from "./utils";

import type { Todo } from "./types/todo";

import "./App.css";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(TODO_STORAGE_KEY, []);
  return (
    <>
      <CurrentListProvider>
        <div className="w-full h-full grid grid-cols-1 gap-4 !py-4">
          <Header />
          <Form
            todos={todos}
            setTodos={setTodos}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
          />
        </div>
      </CurrentListProvider>
    </>
  );
}

export default App;
