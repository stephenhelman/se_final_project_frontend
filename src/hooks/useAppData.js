import { useContext } from "react";
import AppDataContext from "../context/AppDataProvider";

const useAppData = () => {
  const context = useContext(AppDataContext);

  return context;
};

export default useAppData;
