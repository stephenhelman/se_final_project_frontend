import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ButtonRow = ({ page }) => {
  const navigate = useNavigate();

  const handleNewTeamClicked = () => {
    navigate("/teams/new");
  };

  const sortButton = (
    <Button buttonCategory="ghost" buttonText="Sort" buttonType="button" />
  );
  const favoritesButton = (
    <Button buttonCategory="ghost" buttonText="Favorites" buttonType="button" />
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
        {sortButton}
        {favoritesButton}
      </div>
      {page === "teams" && newTeamButton}
    </div>
  );
};

export default ButtonRow;
