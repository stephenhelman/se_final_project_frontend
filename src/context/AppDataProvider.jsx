import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import usePokemonData from "../hooks/usePokemonData";
import useStorage from "../hooks/useStorage";
import icons from "../utils/imageUtils";

const AppDataContext = createContext({});

export const AppDataProvider = ({ children }) => {
  const {
    pokemon: pokemonList,
    isLoading,
    error,
    getPokemonDetails,
    getPokemonById,
  } = usePokemonData(151);
  const { get, set } = useStorage(window.localStorage);

  const [favorites, setFavorites] = useState(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = get("favorites", []);
    setFavorites(new Set(storedFavorites));
  }, [get]);

  // Merge favorites into Pokemon data
  const pokemonWithFavorites = useMemo(() => {
    return pokemonList.map((pokemon) => ({
      ...pokemon,
      isFavorite: favorites.has(pokemon.id),
    }));
  }, [pokemonList, favorites]);

  const toggleFavorite = useCallback(
    (pokemonId) => {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);

        if (newFavorites.has(pokemonId)) {
          newFavorites.delete(pokemonId);
        } else {
          newFavorites.add(pokemonId);
        }

        // Persist to localStorage
        set("favorites", Array.from(newFavorites));

        return newFavorites;
      });
    },
    [set],
  );

  const getFavorites = useCallback(() => {
    return pokemonWithFavorites.filter((p) => p.isFavorite);
  }, [pokemonWithFavorites]);

  const isFavorite = useCallback(
    (pokemonId) => {
      return favorites.has(pokemonId);
    },
    [favorites],
  );

  const value = {
    // Core data
    pokemon: pokemonWithFavorites,
    isLoading,
    error,

    // Helper methods
    getPokemonById,
    getPokemonDetails,
    getFavorites,
    isFavorite,
    toggleFavorite,

    // Legacy (for gradual migration)
    pokemonList: pokemonWithFavorites, // Alias for backward compatibility
    icons,
    toggleFavoriteLocal: toggleFavorite, // Alias for backward compatibility
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

export default AppDataContext;
