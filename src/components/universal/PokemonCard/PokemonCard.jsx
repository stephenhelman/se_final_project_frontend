import { useState } from "react";

import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";
import HoverButtons from "./HoverButtons";
import Button from "../Button";

import "../../../blocks/PokemonCard.css";
const PokemonCard = ({
  pokemon,
  lengthOfTeam,
  onTeamChange,
  isSelected = false,
  onInfo,
  onFavorite,
  page,
  isMobile,
  isTablet,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const mainPokemonType = pokemon?.types[0];

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const addToTeam = () => {
    onTeamChange("add", { name: "players", item: pokemon });
  };

  const removeFromTeam = () => {
    onTeamChange("remove", { name: "players", itemToRemove: pokemon });
  };

  const favoriteButton = (
    <div
      className={`pokemon-card__favorite-button pokemon-card__favorite-button_type_${page}`}
    >
      <Button
        buttonCategory="icon"
        buttonType="button"
        buttonIcon={pokemon.isFavorite ? "favoriteIconActive" : "favoriteIcon"}
        clickFunction={onFavorite}
      />
    </div>
  );

  return (
    <article
      className={`pokemon-card  pokemon-card_type_${page} pokemon-card_type_${mainPokemonType} ${isSelected ? "pokemon-card_selected" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMobile || isTablet ? (
        <HoverButtons
          page={page}
          navigate={onInfo}
          pokemonCount={pokemon.count}
          remove={removeFromTeam}
          decrement={removeFromTeam}
          increment={addToTeam}
          lengthOfTeam={lengthOfTeam}
        />
      ) : (
        isHovering && (
          <HoverButtons
            page={page}
            navigate={onInfo}
            pokemonCount={pokemon.count}
            remove={removeFromTeam}
            decrement={removeFromTeam}
            increment={addToTeam}
            lengthOfTeam={lengthOfTeam}
          />
        )
      )}

      <PokemonSprite
        source={pokemon?.sprite}
        pokemonName={pokemon?.name}
        page={page}
      />
      <PokemonCardDescription pokemon={pokemon} page={page} />
      {favoriteButton}
    </article>
  );
};

export default PokemonCard;
