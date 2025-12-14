import TeamRow from "./TeamRow";

const TeamRowsContainer = ({ teams }) => {
  const content = teams.map((team) => {
    return <TeamRow key={team.id} team={team} />;
  });
  return <ul className="teams__wrapper">{content}</ul>;
};

export default TeamRowsContainer;
