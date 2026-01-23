import ButtonRow from "./ButtonRow";
import "../../blocks/Searchbar.css";

const SearchBar = ({ placeholder, values, handleChange, buttons }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        name="searchTerm"
        placeholder={`${placeholder}...`}
        className="searchbar__input"
        value={values.searchTerm}
        onChange={handleChange}
      />
      <ButtonRow buttons={buttons} />
    </div>
  );
};

export default SearchBar;
