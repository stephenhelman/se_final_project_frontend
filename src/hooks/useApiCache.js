import { useRef, useCallback } from "react";

const useApiCache = () => {
  const cache = useRef(new Map());

  const get = useCallback((key) => {
    if (!cache.current.has(key)) {
      return null;
    }

    return cache.current.get(key);
  }, []);

  const set = useCallback((key, value) => {
    cache.current.set(key, value);
  }, []);

  const has = useCallback(
    (key) => {
      const item = get(key);
      return item !== null;
    },
    [get],
  );

  const remove = useCallback((key) => {
    cache.current.delete(key);
  }, []);

  const clear = useCallback(() => {
    cache.current.clear();
  }, []);

  const size = useCallback(() => {
    return cache.current.size;
  }, []);

  const keys = useCallback(() => {
    return Array.from(cache.current.keys());
  }, []);

  return { get, set, has, remove, clear, size, keys };
};

export default useApiCache;
