//Card that displays the pokemon information
import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";
import "../../../blocks/PokemonCard.css";
const PokemonCard = ({ pokemon }) => {
  //conditionally render the type of card based on what prop is passed into the card
  //TODO - destructure pokemon props to get source and name
  const mainPokemonType = pokemon.types[0];
  return (
    <article className={`pokemon-card pokemon-card_type_${mainPokemonType}`}>
      <PokemonSprite
        source={pokemon.sprite}
        pokemonName={pokemon.name}
        cardType="pokemon-card"
      />
      <PokemonCardDescription
        pokemon={pokemon}
        cardType="pokemon-card"
        size="large"
      />
    </article>
  );
};

export default PokemonCard;
