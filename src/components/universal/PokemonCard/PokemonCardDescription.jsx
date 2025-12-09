//description section that will display the pokemon information, whether it be just the name, or the name, id, and types
import TypeChip from "../TypeChip";
import { formatPokemonId } from "../../../utils/utils";

const PokemonCardDescription = ({ pokemon, cardType, size }) => {
  const pokemonNameClass = `${cardType}__name`;
  const pokemonId = formatPokemonId(pokemon.id);
  const pokemonNameElement =
    size === "large" ? (
      <h4 className={pokemonNameClass}>{pokemon.name}</h4>
    ) : (
      <p className={pokemonNameClass}>{pokemon.name}</p>
    );
  const pokemonIdElement = <p className="pokemon-card__id">{pokemonId}</p>;
  const pokemonInfoElement = (
    <div className={`${cardType}__info`}>
      {pokemonNameElement}
      {size === "large" && pokemonIdElement}
    </div>
  );

  const types = size === "large" && (
    <div className="pokemon-card__types-row">
      {pokemon.types.map((type) => {
        return <TypeChip type={type} key={type} size="small" />;
      })}
    </div>
  );

  return (
    <div className={`${cardType}__description`}>
      {pokemonInfoElement}
      {types}
    </div>
  );
};

export default PokemonCardDescription;
