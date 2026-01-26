import { validationRules } from "./validationRules";

export const validateForm = (values, schema) => {
  const errors = {};

  Object.keys(schema).forEach((fieldName) => {
    const rules = schema[fieldName];
    const fieldValue = values[fieldName];
    const fieldLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    for (const rule of rules) {
      let error = null;

      if (typeof rule === "string") {
        const validationFn = validationRules[rule];
        if (validationFn) {
          error = validationFn(fieldValue, fieldLabel);
        }
      } else if (typeof rule === "object") {
        const ruleName = Object.keys(rule)[0];
        const ruleValue = rule[ruleName];
        const validationFn = validationRules[ruleName];

        if (validationFn) {
          error = validationFn(ruleValue)(fieldValue, fieldLabel);
        }
      } else if (typeof rule === "function") {
        error = rule(fieldValue, values);
      }

      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  });

  return errors;
};

export const validateField = (fieldName, value, rules) => {
  const schema = { [fieldName]: rules };
  const values = { [fieldName]: value };
  const errors = validateForm(values, schema);
  return errors[fieldName] || null;
};
