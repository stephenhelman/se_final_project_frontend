import { createContext } from "react";
import usePokeFetchWithCache from "../../hooks/usePokeFetchWithCache";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const { data, isLoading, error, updatePokemonInformation } =
    usePokeFetchWithCache();

  const value = {
    data,
    isLoading,
    error,
    updatePokemonInformation,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
export default PokemonContext;
