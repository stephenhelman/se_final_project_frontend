import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataContext } from "../../../hooks/useDataContext";

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
  removeFromArray,
}) => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState(false);
  const [isFavorite, setIsFavorite] = useState(pokemon.isFavorite);

  const { toggleFavorite, iconConfig } = useDataContext();
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/pokemon/${pokemon.id}`, { state: { from: location.pathname } });
  };

  const handleMouseMove = () => {
    setMousePosition((prev) => !prev);
  };

  const handleToggleFavoritePokemon = () => {
    setIsFavorite((prev) => !prev);
    toggleFavorite(pokemon.id, !isFavorite);
  };

  const addToTeam = () => {
    addToArray("players", pokemon);
  };

  const removeFromTeam = () => {
    removeFromArray("players", pokemon);
  };

  const favoriteButton = (
    <div className="pokemon-card__favorite-button">
      <Button
        buttonCategory="icon"
        buttonType="button"
        buttonIcon={
          isFavorite ? iconConfig.favoriteIconActive : iconConfig.favoriteIcon
        }
        clickFunction={handleToggleFavoritePokemon}
      />
    </div>
  );

  if (cardType === "team-builder" || cardType === "team-builder-form") {
    return (
      <article
        className={`pokemon-card  pokemon-card_type_${cardType}`}
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
        <PokemonSprite
          source={pokemon?.sprite}
          pokemonName={pokemon?.name}
          cardType={cardType}
        />
        {size !== "small" && (
          <PokemonCardDescription
            pokemon={pokemon}
            cardType="team-builder"
            size={size}
          />
        )}
      </article>
    );
  }

  return (
    <article
      className={`pokemon-card  pokemon-card_type_${cardType}`}
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
          cardType={cardType}
          size={size}
        />
      )}
      {favoriteButton}
    </article>
  );
};

export default PokemonCard;
