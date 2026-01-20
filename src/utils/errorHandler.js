import {
  ERROR_SEVERITY,
  CRITICAL_ERROR_TYPES,
  CRITICAL_ERROR_MESSAGES,
} from "./constants";

export const classifyError = (error) => {
  // Network errors
  if (!navigator.onLine) {
    return {
      severity: ERROR_SEVERITY.CRITICAL,
      type: CRITICAL_ERROR_TYPES.NETWORK_ERROR,
      originalError: error,
    };
  }

  // HTTP Status codes
  if (error.status || error.statusCode) {
    const status = error.status || error.statusCode;

    // 401 Unauthorized
    if (status === 401) {
      return {
        severity: ERROR_SEVERITY.CRITICAL,
        type: CRITICAL_ERROR_TYPES.UNAUTHORIZED,
        originalError: error,
      };
    }

    // 403 Forbidden
    if (status === 403) {
      return {
        severity: ERROR_SEVERITY.CRITICAL,
        type: CRITICAL_ERROR_TYPES.UNAUTHORIZED,
        originalError: error,
      };
    }

    // 408 Timeout
    if (status === 408) {
      return {
        severity: ERROR_SEVERITY.CRITICAL,
        type: CRITICAL_ERROR_TYPES.API_TIMEOUT,
        originalError: error,
      };
    }

    // 500-599 Server errors
    if (status >= 500) {
      return {
        severity: ERROR_SEVERITY.CRITICAL,
        type: CRITICAL_ERROR_TYPES.SERVER_ERROR,
        originalError: error,
      };
    }

    // 400-499 Client errors (except auth)
    if (status >= 400) {
      return {
        severity: ERROR_SEVERITY.ERROR,
        type: "CLIENT_ERROR",
        message: error.message || "Request failed",
        originalError: error,
      };
    }
  }

  // Timeout errors
  if (error.message?.toLowerCase().includes("timeout")) {
    return {
      severity: ERROR_SEVERITY.CRITICAL,
      type: CRITICAL_ERROR_TYPES.API_TIMEOUT,
      originalError: error,
    };
  }

  // Network errors
  if (
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("fetch")
  ) {
    return {
      severity: ERROR_SEVERITY.CRITICAL,
      type: CRITICAL_ERROR_TYPES.NETWORK_ERROR,
      originalError: error,
    };
  }

  // Custom error types
  if (error.type && CRITICAL_ERROR_TYPES[error.type]) {
    return {
      severity: ERROR_SEVERITY.CRITICAL,
      type: error.type,
      originalError: error,
    };
  }

  // Validation errors (field level)
  if (error.field || error.validationError) {
    return {
      severity: ERROR_SEVERITY.FIELD,
      type: "VALIDATION_ERROR",
      message: error.message,
      field: error.field,
      originalError: error,
    };
  }

  // Default to general error
  return {
    severity: ERROR_SEVERITY.ERROR,
    type: "GENERAL_ERROR",
    message: error.message || "An error occurred",
    originalError: error,
  };
};

export const isCriticalError = (error) => {
  const classified = classifyError(error);
  return classified.severity === ERROR_SEVERITY.CRITICAL;
};

export const getErrorDetails = (error) => {
  const classified = classifyError(error);

  if (classified.severity === ERROR_SEVERITY.CRITICAL) {
    return (
      CRITICAL_ERROR_MESSAGES[classified.type] || {
        title: "Error",
        message: classified.message || "An unexpected error occurred",
        action: "OK",
      }
    );
  }

  return {
    message: classified.message || error.message || "An error occurred",
  };
};

export const createError = (type, customMessage) => {
  const error = new Error(customMessage);
  error.type = type;
  return error;
};
