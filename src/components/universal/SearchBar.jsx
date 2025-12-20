//universal search bar component. THe only change is the placeholder text
import ButtonRow from "./ButtonRow";
import "../../blocks/Searchbar.css";

const SearchBar = ({
  placeholder,
  page,
  values,
  handleChange,
  toggleState,
  sortOptions,
  handleSelect,
}) => {
  //state handler to pass state to context
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
      <ButtonRow
        page={page}
        toggleState={toggleState}
        sortOptions={sortOptions}
        handleSelect={handleSelect}
        values={values}
      />
    </div>
  );
};

export default SearchBar;
