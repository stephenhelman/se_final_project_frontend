import Button from "./Button";

const ButtonRow = ({ page }) => {
  const sortButton = (
    <Button buttonCategory="ghost" buttonText="Sort" buttonType="button" />
  );
  const favoritesButton = (
    <Button buttonCategory="ghost" buttonText="Favorites" buttonType="button" />
  );
  const newTeamButton = (
    <Button buttonCategory="ghost" buttonText="New Team" buttonType="button" />
  );

  return (
    <div>
      <div>
        {sortButton}
        {favoritesButton}
      </div>
      {page === "teams" && newTeamButton}
    </div>
  );
};

export default ButtonRow;
