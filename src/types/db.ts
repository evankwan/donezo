import type { Todo } from "./todo";

export type TodoList = {
    id: number;
    name: string;
    items: Todo[];
}

export type LocalStorageDatabase = {
    lists: TodoList[];
}