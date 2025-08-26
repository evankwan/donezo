import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [state: T, setter: React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value); // called second so we only update UI if saving is successful, mimicking API behaviour
      return storedValue;
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
