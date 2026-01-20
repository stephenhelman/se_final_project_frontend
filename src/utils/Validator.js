// utils/Validator.js
import { validationRules } from "./validationRules";

class Validator {
  constructor(values = {}) {
    this.values = values;
    this.errors = {};
    this.currentField = null;
  }

  field(fieldName, label) {
    this.currentField = fieldName;
    this.currentLabel = label || fieldName;
    return this;
  }

  required() {
    if (!this.currentField) return this;

    const error = validationRules.required(
      this.values[this.currentField],
      this.currentLabel,
    );

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  email() {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.email(this.values[this.currentField]);

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  password() {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.password(this.values[this.currentField]);

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  strongPassword() {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.strongPassword(
      this.values[this.currentField],
    );

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  username() {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.username(this.values[this.currentField]);

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  minLength(min) {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.minLength(min)(
      this.values[this.currentField],
      this.currentLabel,
    );

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  maxLength(max) {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.maxLength(max)(
      this.values[this.currentField],
      this.currentLabel,
    );

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  matches(otherField, otherLabel) {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.match(
      this.values[otherField],
      otherLabel || otherField,
    )(this.values[this.currentField]);

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  custom(validationFn) {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationFn(this.values[this.currentField], this.values);

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  arrayLength(min, max) {
    if (!this.currentField || this.errors[this.currentField]) return this;

    const error = validationRules.arrayLength(min, max)(
      this.values[this.currentField],
      this.currentLabel,
    );

    if (error) {
      this.errors[this.currentField] = error;
    }

    return this;
  }

  getErrors() {
    return this.errors;
  }

  isValid() {
    return Object.keys(this.errors).length === 0;
  }

  reset() {
    this.errors = {};
    this.currentField = null;
    return this;
  }
}

export default Validator;
