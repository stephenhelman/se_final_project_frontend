import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iconConfig } from "../../../utils/imageUtils";

import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";
import "../../../blocks/PokemonCard.css";
import Button from "../Button";
const PokemonCard = ({ pokemon, cardType, size }) => {
  const [mousePosition, setMousePosition] = useState(false);
  const navigate = useNavigate();

  const spriteToUse = pokemon.sprites.find((sprite) => {
    return sprite.spriteName === "front_default";
  });

  const handleInfoClick = () => {
    console.log("navigating");
    navigate(`pokemon/${pokemon.id}`);
  };

  //mouseEnterstate => make info and favorite buttons appear
  //mouseExitState => make info and favorite buttons disappear

  const handleMouseMove = () => {
    setMousePosition((prev) => !prev);
  };

  return (
    <article
      className={`pokemon-card  pokemon-card_type_${cardType}`}
      onClick={cardType === "team-selector" ? "" : undefined}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      {mousePosition && (
        <Button
          buttonType="button"
          buttonCategory="icon"
          buttonIcon={iconConfig.infoIcon}
          clickFunction={handleInfoClick}
        />
      )}
      <PokemonSprite
        source={spriteToUse.url}
        pokemonName={pokemon.name}
        cardType={cardType}
      />
      {size !== "small" && (
        <PokemonCardDescription
          pokemon={pokemon}
          cardType={cardType}
          size={size}
        />
      )}
    </article>
  );
};

export default PokemonCard;
