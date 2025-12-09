import TeamUtilityButtons from "./TeamUtilityButtons";

const TeamHeader = ({ isFavorite, name, description }) => {
  return (
    <div className="teams__header">
      <div className="teams__team-info-container">
        {/* Favorties Star */}
        <h4 className="teams__team-name">{name}</h4>
      </div>
      <TeamUtilityButtons description={description} />
    </div>
  );
};

export default TeamHeader;
