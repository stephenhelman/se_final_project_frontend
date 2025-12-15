import TeamPlayers from "../../universal/TeamPlayers";
import TeamHeader from "./TeamHeader";
import TeamMeta from "./TeamMeta";

import { useNavigate } from "react-router-dom";
import { useTeamsContext } from "../../../hooks/useTeamsContext";
import { useState } from "react";

const TeamRow = ({ team }) => {
  const [isFavorite, setIsFavorite] = useState(team.isFavorite);
  const navigate = useNavigate();
  const { toggleFavorite } = useTeamsContext();

  const handleEditTeam = () => {
    navigate(`edit/${team.id}`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toggleFavorite(team.id, !isFavorite);
  };

  return (
    <li className="teams__team-row">
      <TeamHeader
        isFavorite={isFavorite}
        name={team.name}
        description={team.description}
        editFunction={handleEditTeam}
        toggleFavorite={handleToggleFavorite}
      />
      <TeamPlayers team={team.players} page="teams" />
      <TeamMeta updated={team.lastUpdated} numPokemon={team.players.length} />
    </li>
  );
};

export default TeamRow;
