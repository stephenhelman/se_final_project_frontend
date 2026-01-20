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
  addToArray,
  removeFromArrayUsingId,
  isSelected = false,
  handleInfoClick,
}) => {
  const [mousePosition, setMousePosition] = useState(false);

  const mainPokemonType = pokemon?.types[0];

  const { toggleFavorite } = useAppData();

  const handleMouseMove = () => {
    setMousePosition((prev) => !prev);
  };

  const handleToggleFavoriteLocalPokemon = () => {
    toggleFavorite(pokemon.id);
  };

  const addToTeam = () => {
    addToArray("players", pokemon);
  };

  const removeFromTeam = () => {
    removeFromArrayUsingId("players", pokemon);
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
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseMove}
      >
        {cardType === "team-builder" && mousePosition && (
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
        {cardType === "team-builder-form" && mousePosition && (
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
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      {mousePosition && (
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
