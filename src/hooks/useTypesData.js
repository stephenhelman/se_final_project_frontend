import { useState, useEffect } from "react";
import PokeApi from "../api/PokeApi";
import { POKE_BASE_URL } from "../utils/constants";
import { buildTypeMatchupModel } from "../utils/pokemonUtils";
import useApiCache from "./useApiCache";

const useTypesData = (limit = 18) => {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useApiCache();

  useEffect(() => {
    const fetchTypes = async () => {
      const cacheKey = `types-${limit}`;

      // Check cache first
      const cached = cache.get(cacheKey);
      if (cached) {
        setTypes(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const api = new PokeApi(POKE_BASE_URL);

        // 1. Fetch the list of types
        const response = await api.getAllTypes(limit);
        const typesList = response?.results || [];

        // 2. Fetch detailed data for each type
        const typesPromises = typesList.map((type) =>
          api.getOneType(type.url).then(buildTypeMatchupModel),
        );

        const allTypes = await Promise.all(typesPromises);

        // 3. Cache and store
        cache.set(cacheKey, allTypes);
        setTypes(allTypes);
        setError(null);
      } catch (err) {
        console.error("Error fetching types:", err);
        setError(err.message || "Failed to fetch types");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, [limit, cache]);

  return {
    types,
    isLoading,
    error,
  };
};

export default useTypesData;
