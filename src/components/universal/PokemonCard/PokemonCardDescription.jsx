//description section that will display the pokemon information, whether it be just the name, or the name, id, and types
import TypeChip from "../TypeChip";
import { formatPokemonId } from "../../../utils/utils";

const PokemonCardDescription = ({ pokemon, cardType, size }) => {
  const mainPokemonType = pokemon.types[0];
  const pokemonId = formatPokemonId(pokemon.id);
  const pokemonNameElement =
    size === "large" ? (
      <h4 className={`pokemon-card__name pokemon-card__name_type_${cardType}`}>
        {pokemon.name}
      </h4>
    ) : (
      <p className={`pokemon-card__name pokemon-card__name_type_${cardType}`}>
        {pokemon.name}
      </p>
    );
  const pokemonIdElement = <p className="pokemon-card__id">{pokemonId}</p>;
  const pokemonInfoElement = (
    <div className={`pokemon-card__info pokemon-card__info_type_${cardType}`}>
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
    <div
      className={`pokemon-card__description pokemon-card_type_${mainPokemonType} pokemon-card__description_type_${cardType}`}
    >
      {pokemonInfoElement}
      {types}
    </div>
  );
};

export default PokemonCardDescription;
