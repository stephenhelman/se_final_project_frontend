import TeamUtilityButtons from "./TeamUtilityButtons";
import Button from "../../universal/Button";

const TeamHeader = ({
  isFavorite,
  name,
  description,
  editFunction,
  toggleFavorite,
  deleteFunction,
}) => {
  return (
    <div className="teams__header">
      <div className="teams__team-info-container">
        <Button
          buttonCategory="icon"
          buttonType="button"
          buttonIcon={isFavorite ? "favoriteIconActive" : "favoriteIcon"}
          clickFunction={toggleFavorite}
        />
        <h4 className="teams__team-name">{name}</h4>
      </div>
      <TeamUtilityButtons
        description={description}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
      />
    </div>
  );
};

export default TeamHeader;
