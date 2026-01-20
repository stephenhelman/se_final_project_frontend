// components/context/TypesProviderNew.jsx
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import useTypesData from "../hooks/useTypesData";

const TypesContext = createContext({});

export const TypesProvider = () => {
  const { types, isLoading, error } = useTypesData(18);

  const value = {
    types,
    isLoading,
    error,
    // Legacy alias for backward compatibility
    index: types,
  };

  return (
    <TypesContext.Provider value={value}>
      <Outlet />
    </TypesContext.Provider>
  );
};

export default TypesContext;
