import TeamPlayers from "../../universal/TeamPlayers";
import TeamHeader from "./TeamHeader";
import TeamMeta from "./TeamMeta";

import { useNavigate } from "react-router-dom";

const TeamRow = ({ team }) => {
  const navigate = useNavigate();

  const handleEditTeam = () => {
    navigate(`edit/${team.id}`);
  };

  return (
    <li className="teams__team-row">
      <TeamHeader
        isFavorite={team.isFavorite}
        name={team.name}
        description={team.description}
        editFunction={handleEditTeam}
      />
      <TeamPlayers team={team.players} page="teams" />
      <TeamMeta updated={team.lastUpdated} numPokemon={team.players.length} />
    </li>
  );
};

export default TeamRow;
