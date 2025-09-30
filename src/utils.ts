// i like namespacing my local storage keys so that it's easy to see what each key is for and it prevents collisions
export const TODO_STORAGE_KEY = "donezo.todos";

export const sleep = async (waitTimeInMs: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => res(), waitTimeInMs);
  });
};
