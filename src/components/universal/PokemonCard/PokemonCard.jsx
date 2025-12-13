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

  const handleInfoClick = () => {
    navigate(`pokemon/${pokemon.id}`);
  };

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
        source={pokemon.sprite}
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
