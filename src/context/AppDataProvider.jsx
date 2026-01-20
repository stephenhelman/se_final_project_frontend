import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import usePokemonData from "../hooks/usePokemonData";
import useAuth from "../hooks/useAuth";
import useStorage from "../hooks/useStorage";

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
  const { user, updateProfile } = useAuth();

  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (user && user.favoritePokemon) {
      const guestFavorites = get("favorites", []);

      if (guestFavorites.length > 0) {
        const mergedFavorites = [
          ...new Set([...user.favoritePokemon, ...guestFavorites]),
        ];

        updateProfile({ favoritePokemon: mergedFavorites });

        set("favorites", []);

        setFavorites(new Set(mergedFavorites));
      } else {
        setFavorites(new Set(user.favoritePokemon));
      }
    } else {
      const storedFavorites = get("favorites", []);
      setFavorites(new Set(storedFavorites));
    }
  }, [user, updateProfile, set, get]);

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

        const favoritesArray = Array.from(newFavorites);

        if (user) {
          updateProfile({
            favoritePokemon: favoritesArray,
          });
        } else {
          set("favorites", Array.from(newFavorites));
        }

        // Persist to localStorage

        return newFavorites;
      });
    },
    [user, updateProfile, set],
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
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

export default AppDataContext;
