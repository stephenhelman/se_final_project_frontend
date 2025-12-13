import { useEffect, useState } from "react";
import useLocalCache from "./useLocalCache";
import { POKE_BASE_URL } from "../utils/constants";
import usePokeList from "./usePokeList";
import PokeApi from "../api/PokeApi";
import {
  buildLightweightPokemon,
  buildTypeMatchupModel,
} from "../utils/pokemonUtils";
import { resolveCacheKey } from "../utils/utils";

const useIndex = (limit, key) => {
  const cacheIdentifier = `${key}-index`;

  const { get, set } = useLocalCache();
  const {
    list,
    isLoading: listLoading,
    error: listError,
  } = usePokeList(limit, key);

  const cacheKey = resolveCacheKey(cacheIdentifier);

  const [index, setIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = get(cacheKey);
    if (cached && Array.isArray(cached) && cached.length) {
      setIndex(cached);
      setIsLoading(false);
      return;
    }

    if (listLoading) return;
    if (listError) {
      setError(listError);
      setIsLoading(false);
      return;
    }
    if (!list || !list.length) {
      setIndex([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const api = new PokeApi(POKE_BASE_URL);

    let promises;

    if (key === "pokemon") {
      promises = list.map((item) =>
        api.getOnePokemon(item.id).then(buildLightweightPokemon)
      );
    }

    if (key === "type") {
      promises = list.map((item) =>
        api.getOneType(item.url).then(buildTypeMatchupModel)
      );
    }

    Promise.all(promises)
      .then((rows) => {
        set(cacheKey, rows);
        setIndex(rows);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [get, set, list, listLoading, listError, key, cacheKey]);

  return { index, isLoading, error };
};

export default useIndex;
