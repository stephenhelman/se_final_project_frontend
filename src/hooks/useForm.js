import { useState } from "react";

const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    // get the name and value of the input because event.target is the input
    const { value, name } = event.target;
    // set the value into the object using the name
    setValues({ ...values, [name]: value });
  };

  const addToArray = (name, item) => {
    setValues((prev) => ({
      ...prev,
      [name]: [...prev[name], item],
    }));
  };

  const removeFromArray = (name, itemToRemove) => {
    setValues((prev) => {
      const array = prev[name];
      // Find the INDEX of the first matching pokemon
      const indexToRemove = array.findIndex(
        (item) => item.id === itemToRemove.id
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

      // If not found, return unchanged
      return prev;
    });
  };

  const clearArray = (name) => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: [],
      };
    });
  };
  return {
    values,
    handleChange,
    setValues,
    addToArray,
    removeFromArray,
    clearArray,
  };
};

export default useForm;
