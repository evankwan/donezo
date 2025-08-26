import { type Todo, TodoStatus } from "../types/todo"

type Props = {
    todos: Todo[];
}

export default function TodoList(props: Props) {
  const isTodoOpen = (todo: Todo) => todo.status === TodoStatus.OPEN
  const todoList = props.todos
    .filter(todo => isTodoOpen(todo))
      .map((todo) => {
      return (
        <li key={todo.id}>
          <input
            type="checkbox"
          />
          <p>{todo.name}</p>
        </li>
      )
    })
  return (
    <ul>
      {todoList}
    </ul>
  )
}