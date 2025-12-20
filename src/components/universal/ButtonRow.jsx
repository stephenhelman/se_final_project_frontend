import Button from "./Button";
import SortMenu from "./SortMenu";
import { useNavigate } from "react-router-dom";

const ButtonRow = ({
  page,
  toggleState,
  sortOptions,
  handleSelect,
  values,
}) => {
  const navigate = useNavigate();

  const handleNewTeamClicked = () => {
    navigate("/teams/new");
  };

  const toggleFavorites = () => {
    toggleState("favoritesOnly");
  };

  const favoritesButton = (
    <Button
      buttonCategory="ghost"
      buttonText="Favorites"
      buttonType="button"
      clickFunction={toggleFavorites}
    />
  );
  const newTeamButton = (
    <Button
      buttonCategory="ghost"
      buttonText="New Team"
      buttonType="button"
      clickFunction={handleNewTeamClicked}
    />
  );

  return (
    <div className="searchbar__button-row">
      <div className="searchbar__universal-buttons">
        <SortMenu
          sortOptions={sortOptions}
          handleSelect={handleSelect}
          values={values}
        />
        {favoritesButton}
      </div>
      {page === "teams" && newTeamButton}
    </div>
  );
};

export default ButtonRow;
