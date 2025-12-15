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
    console.log(name, itemToRemove);
    setValues((prev) => ({
      ...prev,
      [name]: prev[name].filter((item) => item.id !== itemToRemove.id),
    }));
  };
  return { values, handleChange, setValues, addToArray, removeFromArray };
};

export default useForm;
