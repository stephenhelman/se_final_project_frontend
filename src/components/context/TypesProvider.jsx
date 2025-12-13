import { createContext } from "react";
import useIndex from "../../hooks/useIndex";
import { Outlet } from "react-router-dom";

const TypesContext = createContext({});

export const TypesProvider = () => {
  const { index, isLoading, error } = useIndex(18, "type");

  const value = {
    index,
    isLoading,
    error,
  };

  return (
    <TypesContext.Provider value={value}>
      <Outlet />
    </TypesContext.Provider>
  );
};
export default TypesContext;
