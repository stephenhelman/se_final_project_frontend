import { useState, useCallback } from "react";
import {
  classifyError,
  isCriticalError,
  getErrorDetails,
} from "../utils/errorHandler";

const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const showError = useCallback((err) => {
    const classified = classifyError(err);
    const details = getErrorDetails(err);

    setError(classified);
    setErrorDetails(details);

    console.error("Error occurred:", {
      classified,
      details,
      original: err,
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorDetails(null);
  }, []);

  const handleAsync = useCallback(
    async (asyncFn) => {
      try {
        clearError();
        return await asyncFn();
      } catch (err) {
        showError(err);
        throw err;
      }
    },
    [showError, clearError],
  );

  return {
    error,
    errorDetails,
    isCritical: error ? isCriticalError(error) : false,
    showError,
    clearError,
    handleAsync,
  };
};

export default useErrorHandler;
