import TeamPlayers from "../../universal/TeamPlayers";
import TeamHeader from "./TeamHeader";
import TeamMeta from "./TeamMeta";

const TeamRow = ({ team }) => {
  return (
    <li className="teams__team-row">
      <TeamHeader
        isFavorite={team.isFavorite}
        name={team.name}
        description={team.description}
      />
      <TeamPlayers team={team.players} page="teams" />
      <TeamMeta updated={team.lastUpdated} numPokemon={team.players.length} />
    </li>
  );
};

export default TeamRow;
