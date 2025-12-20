import TeamRow from "./TeamRow";

const TeamRowsContainer = ({ teams, handleDeleteTeam }) => {
  const content = teams.map((team) => {
    return (
      <TeamRow key={team.id} team={team} handleDeleteTeam={handleDeleteTeam} />
    );
  });
  return <ul className="teams__wrapper">{content}</ul>;
};

export default TeamRowsContainer;
