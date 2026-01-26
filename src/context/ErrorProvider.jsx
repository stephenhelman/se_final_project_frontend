import { createContext, useState, useCallback } from "react";
import ErrorModal from "../components/universal/ErrorModal";
import {
  classifyError,
  isCriticalError,
  getErrorDetails,
} from "../utils/errorHandler";

const ErrorContext = createContext({});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const showError = useCallback((err) => {
    const classified = classifyError(err);

    console.error("Global error:", classified, err);

    if (isCriticalError(err)) {
      setError(classified);
      setShowModal(true);
    } else {
      setError(classified);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setShowModal(false);
  }, []);

  const handleModalAction = () => {
    const errorDetails = getErrorDetails(error);

    if (errorDetails.action === "Refresh") {
      window.location.reload();
    } else if (errorDetails.action === "Login") {
      clearError();
    } else {
      clearError();
    }
  };

  const errorDetails = error ? getErrorDetails(error) : null;

  const value = {
    error,
    showError,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}

      {/* Critical Error Modal */}
      {showModal && errorDetails && (
        <ErrorModal
          isOpen={showModal}
          title={errorDetails.title}
          message={errorDetails.message}
          buttonText={errorDetails.action}
          onClose={handleModalAction}
        />
      )}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
