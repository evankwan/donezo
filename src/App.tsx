import Providers from "./contexts/Providers";

import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  return (
    <>
      <Providers>
        <div className="w-full h-full grid grid-cols-1 gap-4 !py-4">
          <Header />
          <Form />
          <TodoList />
        </div>
      </Providers>
    </>
  );
}

export default App;
