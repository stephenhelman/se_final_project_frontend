import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorModal from "./ErrorModal";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.error("ErrorBoundary caught:", error);

  const handleReset = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <ErrorModal
      isOpen={true}
      title="Something Went Wrong"
      message="An unexpected error occurred. The page will reload to recover."
      onClose={handleReset}
      buttonText="Reload Page"
    />
  );
};

const logError = (error, errorInfo) => {
  console.error("ErrorBoundary caught:", error, errorInfo);
};

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={() => {
        console.log("Error boundary reset");
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
