import { useContext } from "react";
import TypesContext from "../components/context/TypesProvider";

export const useTypesContext = () => {
  return useContext(TypesContext);
};
