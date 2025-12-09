import TeamHeader from "./TeamHeader";
import TeamPlayers from "./TeamPlayers";
import TeamMeta from "./TeamMeta";

const TeamRow = ({ team }) => {
  return (
    <li className="teams__team-row">
      <TeamHeader
        isFavorite={team.isFavorite}
        name={team.name}
        description={team.description}
      />
      <TeamPlayers players={team.players} />
      <TeamMeta updated={team.lastUpdated} />
    </li>
  );
};

export default TeamRow;
