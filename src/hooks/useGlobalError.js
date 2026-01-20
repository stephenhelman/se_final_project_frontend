import { useContext } from "react";
import ErrorContext from "../context/ErrorProvider";

const useGlobalError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useGlobalError must be used within ErrorProvider");
  }

  return context;
};

export default useGlobalError;
