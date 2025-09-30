import useLocalStorage from "../hooks/useLocalStorage";

import { TODO_STORAGE_KEY } from "../utils";

import type { List } from "../types/todo";

export default function useTodosApi() {
  // i decided to use a NoSQL style of storing the data in local storage to take advantage of local storage's already built interface, instead of trying to mimic a SQL DB in local storage. i think the SQL DB style is a better fit for a todo list app, but for simplicity since this is relying on local storage instead of an api/databasem, i decided to just use the JSON storage
  const [lists, _setLists, _getLists] = useLocalStorage<List[]>(
    TODO_STORAGE_KEY,
    [],
  );

  const initLocalStorageDatabase = async (): Promise<List[] | undefined> => {
    return setLists([
      {
        id: 0,
        name: "default",
        todos: [],
      },
    ]);
  };

  const getLists = async () => {
    let lists = _getLists();
    // init the local storage instance when we fetch lists for the first time
    if (lists?.length === 0) {
      lists = await initLocalStorageDatabase();
    }
    return lists;
  };

  const setLists = async (value: List[]) => {
    return _setLists(value);
  };

  const updateList = async (listId: List["id"], value: List) => {
    _setLists((prev: List[]): List[] => {
      return prev.map((list): List => {
        return list.id === listId ? value : list;
      });
    });
  };

  return {
    lists,
    setLists,
    getLists,
    updateList,
  };
}
