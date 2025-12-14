import { useContext } from "react";
import PokemonContext from "../components/context/PokemonProvider";

export const useDataContext = () => {
  return useContext(PokemonContext);
};
