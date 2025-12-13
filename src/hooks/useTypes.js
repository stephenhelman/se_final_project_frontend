import { useContext } from "react";
import TypesContext from "../components/context/TypesProvider";

export const useTypes = () => {
  return useContext(TypesContext);
};
