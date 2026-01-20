import { useContext } from "react";
import TypesContext from "../context/TypesProvider";

const useTypesContext = () => {
  return useContext(TypesContext);
};

export default useTypesContext;
