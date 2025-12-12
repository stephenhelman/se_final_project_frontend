import { useState, useEffect, useCallback } from "react";
import PokeApi from "../api/PokeApi";
import { POKE_BASE_URL } from "../utils/constants";
import { buildInitialPokemon } from "../utils/pokemonUtils";

const usePokeFetchWithCache = () => {
  // Default duration: 1 hour in milliseconds
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = "pokemon-data";
  const setItemToLocalStorage = (item) => {
    localStorage.setItem(cacheKey, JSON.stringify(item));
    console.log("item stored in storage");
  };

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);

    // Use cached data, skip fetch
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setData(data);
      setIsLoading(false);
      return;
    }

    const pokeApi = new PokeApi(POKE_BASE_URL);

    pokeApi
      .getAllPokemon(151)
      .then((pokeList) => {
        const pokePromises = pokeList.results.map((pokemon) => {
          return pokeApi.getOnePokemon(pokemon.url).catch((err) => {
            setError(err);
          });
        });
        Promise.all(pokePromises)
          .then((results) => {
            const pokemonList = results.map((pokemon) =>
              buildInitialPokemon(pokemon)
            );
            setData(pokemonList);
            setItemToLocalStorage(pokemonList);
          })
          .catch((err) => {
            setError(err);
          });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updatePokemonInformation = useCallback((id, updates) => {
    setData((prevItems) => {
      const updatedList = prevItems.map((item) => {
        return item.id === id ? { ...item, ...updates } : item;
      });
      localStorage.setItem(cacheKey, JSON.stringify(updatedList));
      return updatedList;
    });
  }, []);

  return { data, isLoading, error, updatePokemonInformation };
};

export default usePokeFetchWithCache;
