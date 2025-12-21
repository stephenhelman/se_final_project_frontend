import { useContext } from "react";
import TypesContext from "../components/context/TypesProvider";

const useTypesContext = () => {
  return useContext(TypesContext);
};

export default useTypesContext;
