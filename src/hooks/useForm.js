import { useState } from "react";

const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);
  const defaults = inputValues;

  const handleReset = (keys) => {
    keys.forEach((key) => {
      setValues((prev) => {
        return {
          ...prev,
          [key]: defaults[key],
        };
      });
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const addToArray = ({ name, item }) => {
    setValues((prev) => ({
      ...prev,
      [name]: [...prev[name], item],
    }));
  };

  const handleSelect = (name, item) => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: item,
      };
    });
  };

  const removeFromArrayUsingId = ({ name, itemToRemove }) => {
    setValues((prev) => {
      const array = prev[name];
      const indexToRemove = array.findIndex(
        (item) => item.id === itemToRemove.id,
      );

      if (indexToRemove !== -1) {
        return {
          ...prev,
          [name]: [
            ...array.slice(0, indexToRemove),
            ...array.slice(indexToRemove + 1),
          ],
        };
      }

      return prev;
    });
  };

  const removeFromArrayUsingString = (name, itemToRemove) => {
    setValues((prev) => {
      const array = prev[name];

      const indexToRemove = array.findIndex((item) => {
        return item.toLowerCase() === itemToRemove.toLowerCase();
      });

      if (indexToRemove !== -1) {
        return {
          ...prev,
          [name]: [
            ...array.slice(0, indexToRemove),
            ...array.slice(indexToRemove + 1),
          ],
        };
      }
      return prev;
    });
  };

  const clearArray = ({ name }) => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: [],
      };
    });
  };

  const toggleInArray = (name, item) => {
    if (values[name].includes(item)) {
      return removeFromArrayUsingString(name, item);
    }

    return addToArray({ name, item });
  };

  const toggleState = (name) => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  return {
    values,
    handleChange,
    setValues,
    addToArray,
    removeFromArrayUsingId,
    clearArray,
    toggleInArray,
    toggleState,
    handleSelect,
    handleReset,
  };
};

export default useForm;
