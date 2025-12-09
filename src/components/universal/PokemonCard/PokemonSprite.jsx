// TODO - Add class name solution for different sprites
import "../../../blocks/PokemonSprite.css";

const PokemonSprite = ({ pokemonName, source, cardType }) => {
  return (
    <img
      src={source}
      alt={pokemonName}
      className={`sprite ${cardType}__sprite`}
    />
  );
};

export default PokemonSprite;
