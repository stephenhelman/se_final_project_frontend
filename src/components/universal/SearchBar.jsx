//universal search bar component. THe only change is the placeholder text
import ButtonRow from "./ButtonRow";
import "../../blocks/Searchbar.css";

const SearchBar = ({ placeholder, page }) => {
  //state handler to pass state to context
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder={`${placeholder}...`}
        className="searchbar__input"
      />
      <ButtonRow page={page} />
    </div>
  );
};

export default SearchBar;
