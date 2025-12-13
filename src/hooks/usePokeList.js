// src/hooks/usePokeList.js
import { useEffect, useState } from "react";
import useLocalCache from "./useLocalCache";
import { POKE_BASE_URL } from "../utils/constants";
import PokeApi from "../api/PokeApi";
import { resolveCacheKey } from "../utils/utils";

const useList = (limit, key) => {
  const cacheIdentifier = `${key}-list`;
  const { get, set } = useLocalCache();

  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = resolveCacheKey(cacheIdentifier);

  useEffect(() => {
    const cached = get(cacheKey);
    if (cached && Array.isArray(cached) && cached.length) {
      setList(cached);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const api = new PokeApi(POKE_BASE_URL);

    if (key === "pokemon") {
      api
        .getAllPokemon(limit)
        .then((data) => {
          const results = data?.results || [];
          const newList = results.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          });
          set(cacheKey, newList);
          setList(newList);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    }

    if (key === "type") {
      api
        .getAllTypes(limit)
        .then((data) => {
          const results = data?.results || [];
          set(cacheKey, results);
          setList(results);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [get, set, limit, key, cacheKey]);

  return { list, isLoading, error };
};

export default useList;
