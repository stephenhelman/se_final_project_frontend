import { createContext, useState, useEffect } from "react";
import useIndex from "../../hooks/useIndex";
import useLocalCache from "../../hooks/useLocalCache";
import { matchData } from "../../utils/utils";
import { iconConfig } from "../../utils/imageUtils";
import useSessionCache from "../../hooks/useSessionCache";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const { index, isLoading, error } = useIndex(151, "pokemon");
  const [pokemonList, setPokemonList] = useState([]);
  const { set } = useLocalCache();
  const { set: setSession, get: getSession } = useSessionCache();

  useEffect(() => {
    if (isLoading || !index || !index.length) return;
    setPokemonList(index);
  }, [isLoading, index]);

  const toggleFavoriteLocal = (id, value) => {
    const match = matchData(id, index);
    //replace match in array
    const newList = pokemonList.map((item) => {
      return item.id === match.id ? { ...item, isFavorite: value } : item;
    });

    //save to storage
    set("poke:index:kanto151", newList);
    const sessionKey = `pokemon:details:${id}`;
    const sessionCache = getSession(sessionKey);
    if (sessionCache) {
      const newPokemon = {
        ...sessionCache,
        isFavorite: value,
      };
      setSession(sessionKey, newPokemon);
    }
    //set new state
    setPokemonList(newList);
  };

  const value = {
    pokemonList,
    isLoading,
    error,
    iconConfig,
    toggleFavoriteLocal,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
export default PokemonContext;
