import { useState } from "react";
import useAppData from "../../../hooks/useAppData";

import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";
import HoverButtons from "./HoverButtons";
import Button from "../Button";

import "../../../blocks/PokemonCard.css";
const PokemonCard = ({
  pokemon,
  cardType,
  size,
  lengthOfTeam,
  onTeamChange,
  isSelected = false,
  handleInfoClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const mainPokemonType = pokemon?.types[0];

  const { toggleFavorite } = useAppData();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleToggleFavoriteLocalPokemon = () => {
    toggleFavorite(pokemon.id);
  };

  const addToTeam = () => {
    onTeamChange("add", { name: "players", item: pokemon });
  };

  const removeFromTeam = () => {
    onTeamChange("remove", { name: "players", itemToRemove: pokemon });
  };

  const favoriteButton = (
    <div className="pokemon-card__favorite-button">
      <Button
        buttonCategory="icon"
        buttonType="button"
        buttonIcon={pokemon.isFavorite ? "favoriteIconActive" : "favoriteIcon"}
        clickFunction={handleToggleFavoriteLocalPokemon}
      />
    </div>
  );

  if (
    cardType === "team-builder" ||
    cardType === "team-builder-form" ||
    cardType === "evolution"
  ) {
    return (
      <article
        className={`pokemon-card  pokemon-card_type_small ${
          cardType === "evolution" && isSelected
            ? "pokemon-card_type_small-selected"
            : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardType === "team-builder" && isHovering && (
          <HoverButtons
            cardType={cardType}
            navigate={handleInfoClick}
            remove={removeFromTeam}
            increment={addToTeam}
            decrement={removeFromTeam}
            pokemonCount={pokemon.count}
            lengthOfTeam={lengthOfTeam}
          />
        )}
        {cardType === "team-builder-form" && isHovering && (
          <HoverButtons
            cardType={cardType}
            navigate={handleInfoClick}
            remove={removeFromTeam}
            increment={addToTeam}
            decrement={removeFromTeam}
            pokemonCount={pokemon.count}
            lengthOfTeam={lengthOfTeam}
          />
        )}
        <PokemonSprite
          source={pokemon?.sprite}
          pokemonName={pokemon?.name}
          cardType={cardType}
        />
        {size !== "small" && (
          <PokemonCardDescription
            pokemon={pokemon}
            cardType="small"
            size={size}
            mainPokemonType={mainPokemonType}
          />
        )}
      </article>
    );
  }

  return (
    <article
      className={`pokemon-card  pokemon-card_type_large`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <HoverButtons navigate={handleInfoClick} cardType={cardType} />
      )}
      <PokemonSprite
        source={pokemon?.sprite}
        pokemonName={pokemon?.name}
        cardType={cardType}
      />
      {size !== "small" && (
        <PokemonCardDescription
          pokemon={pokemon}
          cardType="large"
          size={size}
          mainPokemonType={mainPokemonType}
        />
      )}
      {favoriteButton}
    </article>
  );
};

export default PokemonCard;
