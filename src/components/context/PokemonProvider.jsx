import { createContext } from "react";
import useIndex from "../../hooks/useIndex";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const { index, isLoading, error } = useIndex(151, "pokemon");

  const value = {
    index,
    isLoading,
    error,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
export default PokemonContext;
