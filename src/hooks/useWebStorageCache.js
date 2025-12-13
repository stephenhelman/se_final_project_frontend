// src/hooks/useLocalCache.js
import { useCallback } from "react";

const useWebStorageCache = (storage) => {
  const get = useCallback(
    (key) => {
      try {
        const raw = storage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);

        return parsed;
      } catch (err) {
        console.error("Cache get error:", err);
        return null;
      }
    },
    [storage]
  );

  const set = useCallback(
    (key, value) => {
      try {
        const payload = value;

        storage.setItem(key, JSON.stringify(payload));
        return true;
      } catch (err) {
        console.error("Cache set error:", err);
        return false;
      }
    },
    [storage]
  );

  const remove = useCallback(
    (key) => {
      try {
        storage.removeItem(key);
        return true;
      } catch (err) {
        console.error("Cache remove error:", err);
        return false;
      }
    },
    [storage]
  );

  const clear = useCallback(() => {
    try {
      storage.clear();
      return true;
    } catch (err) {
      console.error("Cache clear error:", err);
      return false;
    }
  }, [storage]);

  return { get, set, remove, clear };
};

export default useWebStorageCache;
