import TeamPlayers from "../../universal/TeamPlayers";
import TeamHeader from "./TeamHeader";
import TeamMeta from "./TeamMeta";

import useTeamsContext from "../../../hooks/useTeamsContext";
import { useState } from "react";

const TeamRow = ({ team, handleDeleteTeam, handleEditButton }) => {
  const [isFavorite, setIsFavorite] = useState(team.isFavorite);
  const { toggleFavorite } = useTeamsContext();

  const handleDeleteButton = () => {
    handleDeleteTeam(team);
    //TODO - delete function in API
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
        editFunction={handleEditButton}
        toggleFavorite={handleToggleFavorite}
        deleteFunction={handleDeleteButton}
      />
      <TeamPlayers team={team.players} page="teams" />
      <TeamMeta updated={team.lastUpdated} numPokemon={team.players.length} />
    </li>
  );
};

export default TeamRow;
