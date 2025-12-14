import TeamUtilityButtons from "./TeamUtilityButtons";

const TeamHeader = ({ isFavorite, name, description, editFunction }) => {
  return (
    <div className="teams__header">
      <div className="teams__team-info-container">
        <h4 className="teams__team-name">{name}</h4>
      </div>
      <TeamUtilityButtons
        description={description}
        editFunction={editFunction}
      />
    </div>
  );
};

export default TeamHeader;
