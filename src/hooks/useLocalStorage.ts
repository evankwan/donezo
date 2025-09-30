import { useState } from "react";

type Callback<T> = (prev: T) => T;

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [
  state: T,
  setter: (val: T | Callback<T>) => T | undefined,
  getter: () => T | undefined,
] {
  const _getValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const state = JSON.parse(item);
        return state;
      }
      return defaultValue;
    } catch (error) {
      // this goes for all error handling here, this would be a good place for bubbling up the error so it can be captured by any frontend monitoring tool like sentry, but i'm not using anything here so we're just going to log it in the console
      console.error(error);
      return defaultValue;
    }
  };
  const [storedValue, setStoredValue] = useState<T>(() => {
    return _getValue();
  });
  const getValue = () => {
    const value = _getValue();
    if (value) {
      setStoredValue(value);
    }
    return value;
  };

  const setValue = (value: T | Callback<T>): T | undefined => {
    let newValue = value;
    try {
      if (typeof newValue === "function") {
        newValue = (value as Callback<T>)(storedValue);
      }
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue); // called second so we only update UI if saving is successful, mimicking API behaviour
      return storedValue;
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, getValue];
}
