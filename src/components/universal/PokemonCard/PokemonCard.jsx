//Card that displays the pokemon information
import PokemonSprite from "./PokemonSprite";
import PokemonCardDescription from "./PokemonCardDescription";

const PokemonCard = ({ pokemon, cardType }) => {
  //conditionally render the type of card based on what prop is passed into the card
  //TODO - destructure pokemon props to get source and name
  const { source, name } = pokemon;
  return (
    <div>
      <PokemonSprite source={source} name={name} />
      <PokemonCardDescription pokemon={pokemon} cardType={cardType} />
    </div>
  );
};

export default PokemonCard;
