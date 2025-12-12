import { useContext } from "react";
import PokemonContext from "../components/context/PokemonProvider";

export const useData = () => {
  return useContext(PokemonContext);
};
