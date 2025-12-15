import { useEffect, useState } from "react";
import useSessionCache from "./useSessionCache";
import PokeApi from "../api/PokeApi";
import { POKE_BASE_URL } from "../utils/constants";
import { buildDetailPokemon } from "../utils/pokemonUtils";

const usePokemonDetails = (pokemonKey, originalPokemonData) => {
  const { get, set } = useSessionCache();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonKey) return;

    const cacheKey = `pokemon:details:${pokemonKey}`;
    const cachedPokemon = get(cacheKey);
    console.log(cachedPokemon);

    if (cachedPokemon) {
      setPokemon(cachedPokemon);
      setIsLoading(false);
      return;
    }

    const api = new PokeApi(POKE_BASE_URL);
    buildDetailPokemon(originalPokemonData, api)
      .then((detailedPokemon) => {
        setPokemon(detailedPokemon);
        set(cacheKey, detailedPokemon);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Error building detailed pokemon", err);
      });
  }, [pokemonKey, get, set, originalPokemonData]);

  return { pokemon, isLoading, error };
};

export default usePokemonDetails;
