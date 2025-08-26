export const TodoStatus = {
  COMPLETED: "complete",
  OPEN: "open",
} as const;

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

export type Todo = {
  id: number;
  name: string;
  status: TodoStatus;
};
