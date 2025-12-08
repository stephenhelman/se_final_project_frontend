import TeamUtilityButtons from "./TeamUtilityButtons";

const TeamHeader = ({ isFavorite, name, description }) => {
  return (
    <div>
      <div>
        {/* Favorties Star */}
        <h4>{name}</h4>
      </div>
      <TeamUtilityButtons description={description} />
    </div>
  );
};

export default TeamHeader;
