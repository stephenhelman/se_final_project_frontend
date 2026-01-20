// hooks/usePokemonData.js
import { useState, useEffect, useCallback } from "react";
import PokeApi from "../api/PokeApi";
import { POKE_BASE_URL } from "../utils/constants";
import {
  buildLightweightPokemon,
  buildDetailPokemon,
} from "../utils/pokemonUtils";
import useApiCache from "./useApiCache";

const usePokemonData = (limit = 151) => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useApiCache();

  // Fetch all Pokemon on mount
  useEffect(() => {
    const fetchPokemon = async () => {
      const cacheKey = `pokemon-list-${limit}`;

      // Check cache first
      const cached = cache.get(cacheKey);
      if (cached) {
        setPokemon(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const api = new PokeApi(POKE_BASE_URL);

        // 1. Fetch the list of Pokemon (just names and URLs)
        const response = await api.getAllPokemon(limit);
        const pokemonList = response?.results || [];

        // 2. Fetch lightweight data for each Pokemon
        const pokemonPromises = pokemonList.map((item, index) =>
          api.getOnePokemon(index + 1).then(buildLightweightPokemon),
        );

        const allPokemon = await Promise.all(pokemonPromises);

        // 3. Cache and store
        cache.set(cacheKey, allPokemon);
        setPokemon(allPokemon);
        setError(null);
      } catch (err) {
        console.error("Error fetching Pokemon:", err);
        setError(err.message || "Failed to fetch Pokemon");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, cache]);

  const getPokemonDetails = useCallback(
    async (pokemonId) => {
      const cacheKey = `pokemon-details-${pokemonId}`;

      // Check cache first
      const cached = cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Find the lightweight Pokemon
      const lightPokemon = pokemon.find((p) => p.id === pokemonId);
      if (!lightPokemon) {
        throw new Error(`Pokemon with ID ${pokemonId} not found`);
      }

      try {
        const api = new PokeApi(POKE_BASE_URL);
        const detailedPokemon = await buildDetailPokemon(lightPokemon, api);

        // Cache the result
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
    error,
    getPokemonDetails,
    getPokemonById,
  };
};

export default usePokemonData;
