import useLocalStorage from "../hooks/useLocalStorage";

import { TODO_STORAGE_KEY } from "../utils";

import type { List } from "../types/todo";

export default function useTodosApi() {
  const [lists, _setLists, _getLists] = useLocalStorage<List[]>(
    TODO_STORAGE_KEY,
    [],
  )
  
  const getLists = async () => {
    let lists = _getLists();
    if (lists?.length === 0) {
      lists = await setLists([
        {
          id: 0,
          name: "default",
          todos: [],
        }
      ])
    }
    return lists;
  };

  const setLists = async(value: List[]) => {
    return _setLists(value);
  }

  const updateList = async(listId: List["id"], value: List) => {
    _setLists((prev: List[]): List[] => {
      return prev.map((list): List => {
        return list.id === listId
          ? value
          : list
      })
    })
  }

  return {
    lists,
    setLists,
    getLists,
    updateList,
  };
}
