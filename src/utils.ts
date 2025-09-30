export const TODO_STORAGE_KEY = "donezo.todos";

export const sleep = async (waitTimeInMs: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => res(), waitTimeInMs);
  });
};
