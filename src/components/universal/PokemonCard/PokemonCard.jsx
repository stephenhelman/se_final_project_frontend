import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";
import "../../../blocks/PokemonCard.css";
const PokemonCard = ({ pokemon, cardType, size }) => {
  return (
    <article
      className={`pokemon-card  pokemon-card_type_${cardType}`}
      onClick={cardType === "team-selector" ? "" : undefined}
    >
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
