import { useState, useEffect, useCallback } from "react";
import PokeApi from "../api/PokeApi";
import { POKE_BASE_URL } from "../utils/constants";
import {
  buildLightweightPokemon,
  buildDetailPokemon,
} from "../utils/pokemonUtils";
import useApiCache from "./useApiCache";

import useGlobalError from "../hooks/useGlobalError";

const usePokemonData = (limit = 151) => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const { showError } = useGlobalError();
  const cache = useApiCache();

  useEffect(() => {
    const fetchPokemon = async () => {
      const cacheKey = `pokemon-list-${limit}`;

      const cached = cache.get(cacheKey);
      if (cached) {
        setPokemon(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setGlobalError(null);

      try {
        const api = new PokeApi(POKE_BASE_URL);

        const response = await api.getAllPokemon(limit);
        const pokemonList = response?.results || [];

        const pokemonPromises = pokemonList.map((item, i) =>
          api.getOnePokemon(i + 1).then(buildLightweightPokemon),
        );

        const allPokemon = await Promise.all(pokemonPromises);

        cache.set(cacheKey, allPokemon);
        setPokemon(allPokemon);
        setGlobalError(null);
      } catch (err) {
        console.error("Error fetching Pokemon:", err);
        setGlobalError(err.message || "Failed to fetch Pokemon");
        showError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, cache, showError]);

  const getPokemonDetails = useCallback(
    async (pokemonId) => {
      const cacheKey = `pokemon-details-${pokemonId}`;

      const cached = cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const lightPokemon = pokemon.find((p) => p.id === pokemonId);
      if (!lightPokemon) {
        throw new Error(`Pokemon with ID ${pokemonId} not found`);
      }

      try {
        const api = new PokeApi(POKE_BASE_URL);
        const detailedPokemon = await buildDetailPokemon(lightPokemon, api);

        cache.set(cacheKey, detailedPokemon);

        return detailedPokemon;
      } catch (err) {
        console.error(`Error fetching details for Pokemon ${pokemonId}:`, err);
        throw err;
      }
    },
    [pokemon, cache],
  );

  const getPokemonById = useCallback(
    (pokemonId) => {
      return pokemon.find((p) => p.id === pokemonId) || null;
    },
    [pokemon],
  );

  return {
    pokemon,
    isLoading,
    globalError,
    getPokemonDetails,
    getPokemonById,
  };
};

export default usePokemonData;
