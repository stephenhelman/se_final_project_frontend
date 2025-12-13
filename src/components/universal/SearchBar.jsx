//universal search bar component. THe only change is the placeholder text
import ButtonRow from "./ButtonRow";
import useForm from "../../hooks/useForm";
import "../../blocks/Searchbar.css";

const SearchBar = ({ placeholder, page, values, handleChange }) => {
  //state handler to pass state to context
  return (
    <div className="searchbar">
      <input
        type="text"
        name="search"
        placeholder={`${placeholder}...`}
        className="searchbar__input"
        value={values.search}
        onChange={handleChange}
      />
      <ButtonRow page={page} />
    </div>
  );
};

export default SearchBar;
