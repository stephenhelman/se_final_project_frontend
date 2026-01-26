import TeamPlayers from "../../universal/TeamPlayers";
import TeamHeader from "./TeamHeader";
import TeamMeta from "./TeamMeta";
import PokemonSprite from "../../universal/PokemonCard/PokemonSprite";
import BlankSprite from "./BlankSprite";

import { useState } from "react";

const TeamRow = ({
  team,
  handleDeleteTeam,
  handleEditButton,
  toggleFavorite,
  showInfo,
  isBreakpoint,
}) => {
  const [isFavorite, setIsFavorite] = useState(team.isFavorite);

  const handleDeleteButton = () => {
    handleDeleteTeam(team);
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toggleFavorite(team.id, !isFavorite);
  };

  let teamElements;
  if (team.players.length !== 6) {
    teamElements = team.players.map((pokemon, i) => {
      return (
        <li key={i} className="teams__list-item">
          <PokemonSprite
            pokemonName={pokemon.name}
            source={pokemon.sprite}
            cardType="teams"
          />
        </li>
      );
    });

    const emptySpaces = 6 - team.players.length;

    for (let i = 0; i < emptySpaces; i++) {
      teamElements.push(
        <li key={i + team.length} className="teams__list-item">
          <BlankSprite />
        </li>,
      );
    }
  } else {
    teamElements = team.players.map((pokemon, i) => {
      return (
        <li key={i} className="teams__list-item">
          <PokemonSprite
            pokemonName={pokemon.name}
            source={pokemon.sprite}
            cardType="teams"
          />
        </li>
      );
    });
  }

  return (
    <li className="teams__team-row">
      <TeamHeader
        isFavorite={isFavorite}
        name={team.name}
        description={team.description}
        editFunction={handleEditButton}
        toggleFavorite={handleToggleFavorite}
        deleteFunction={handleDeleteButton}
        showInfo={showInfo}
        isBreakpoint={isBreakpoint}
      />
      <TeamPlayers team={teamElements} page="teams" />
      <TeamMeta updated={team.lastUpdated} numPokemon={team.players.length} />
    </li>
  );
};

export default TeamRow;
