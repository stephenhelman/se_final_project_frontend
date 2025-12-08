//universal search bar component. THe only change is the placeholder text
import ButtonRow from "./ButtonRow";

const SearchBar = ({ placeholder, page }) => {
  //state handler to pass state to context
  return (
    <div>
      <form>
        <input type="text" placeholder={`Search ${placeholder}...`} />
      </form>
      <ButtonRow page={page} />
    </div>
  );
};

export default SearchBar;
