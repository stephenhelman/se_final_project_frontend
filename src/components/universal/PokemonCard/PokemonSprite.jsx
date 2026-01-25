// TODO - Add class name solution for different sprites
import "../../../blocks/PokemonSprite.css";

const PokemonSprite = ({ pokemonName, source, page }) => {
  return (
    <img
      src={source}
      alt={pokemonName}
      className={`sprite sprite_type_${page}`}
    />
  );
};

export default PokemonSprite;
