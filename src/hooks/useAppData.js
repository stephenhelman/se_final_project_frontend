// hooks/useAppData.js
import { useContext } from "react";
import AppDataContext from "../context/AppDataProvider";

const useAppData = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return context;
};

export default useAppData;
