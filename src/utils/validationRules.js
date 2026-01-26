import { VALIDATION_PATTERNS } from "./constants";

export const validationRules = {
  required: (value, fieldName = "This field") => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null; // Only validate if value exists
    if (!VALIDATION_PATTERNS.email.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!VALIDATION_PATTERNS.password.test(value)) {
      return "Password must contain at least one letter and one number";
    }
    return null;
  },

  strongPassword: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*#?&])/.test(value)) {
      return "Password must contain at least one special character (@$!%*#?&)";
    }
    return null;
  },

  username: (value) => {
    if (!value) return null;
    if (value.length < 3) {
      return "Username must be at least 3 characters";
    }
    if (value.length > 20) {
      return "Username must be less than 20 characters";
    }
    if (!VALIDATION_PATTERNS.username.test(value)) {
      return "Username can only contain letters, numbers, hyphens, and underscores";
    }
    return null;
  },

  minLength:
    (min) =>
    (value, fieldName = "This field") => {
      if (!value) return null;
      if (value.length < min) {
        return `${fieldName} must be at least ${min} characters`;
      }
      return null;
    },

  maxLength:
    (max) =>
    (value, fieldName = "This field") => {
      if (!value) return null;
      if (value.length > max) {
        return `${fieldName} must be less than ${max} characters`;
      }
      return null;
    },

  match:
    (otherValue, otherFieldName = "field") =>
    (value) => {
      if (!value) return null;
      if (value !== otherValue) {
        return `Does not match ${otherFieldName}`;
      }
      return null;
    },

  min:
    (minValue) =>
    (value, fieldName = "Value") => {
      if (value === "" || value === null || value === undefined) return null;
      if (Number(value) < minValue) {
        return `${fieldName} must be at least ${minValue}`;
      }
      return null;
    },

  max:
    (maxValue) =>
    (value, fieldName = "Value") => {
      if (value === "" || value === null || value === undefined) return null;
      if (Number(value) > maxValue) {
        return `${fieldName} must be no more than ${maxValue}`;
      }
      return null;
    },

  url: (value) => {
    if (!value) return null;
    if (!VALIDATION_PATTERNS.url.test(value)) {
      return "Please enter a valid URL";
    }
    return null;
  },

  pattern:
    (regex, message = "Invalid format") =>
    (value) => {
      if (!value) return null;
      if (!regex.test(value)) {
        return message;
      }
      return null;
    },

  arrayLength:
    (min, max) =>
    (value, fieldName = "Items") => {
      if (!Array.isArray(value)) return null;
      if (min && value.length < min) {
        return `${fieldName} must have at least ${min} item${min > 1 ? "s" : ""}`;
      }
      if (max && value.length > max) {
        return `${fieldName} must have no more than ${max} item${max > 1 ? "s" : ""}`;
      }
      return null;
    },
};
