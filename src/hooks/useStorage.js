import { useCallback } from "react";

const useStorage = (storage = window.localStorage) => {
  const get = useCallback(
    (key, defaultValue = null) => {
      try {
        const item = storage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      } catch (error) {
        console.error(`Error reading from storage (key: ${key}):`, error);
        return defaultValue;
      }
    },
    [storage],
  );

  const set = useCallback(
    (key, value) => {
      try {
        storage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Error writing to storage (key: ${key}):`, error);
        return false;
      }
    },
    [storage],
  );

  const remove = useCallback(
    (key) => {
      try {
        storage.removeItem(key);
        return true;
      } catch (error) {
        console.error(`Error removing from storage (key: ${key}):`, error);
        return false;
      }
    },
    [storage],
  );

  const clear = useCallback(() => {
    try {
      storage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  }, [storage]);

  return { get, set, remove, clear };
};

export default useStorage;
