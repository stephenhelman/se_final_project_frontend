import { useContext } from "react";
import PokemonContext from "../components/context/PokemonProvider";

const useDataContext = () => {
  return useContext(PokemonContext);
};

export default useDataContext;
