//description section that will display the pokemon information, whether it be just the name, or the name, id, and types
import TypeChip from "../TypeChip";
import { formatPokemonId } from "../../../utils/utils";

const PokemonCardDescription = ({ pokemon, page }) => {
  const pokemonId = formatPokemonId(pokemon?.id);

  return (
    <div
      className={`pokemon-card__info-wrapper pokemon-card__info-wrapper_type_${page}`}
    >
      <div
        className={`pokemon-card__description pokemon-card__description_type_${page}`}
      >
        <p className={`pokemon-card__name pokemon-card__name_type_${page}`}>
          {pokemon?.name}
        </p>
        <p className={`pokemon-card__id pokemon-card__id_type_${page}`}>
          {pokemonId}
        </p>
      </div>
      <div
        className={`pokemon-card__types-row pokemon-card__types-row_type_${page}`}
      >
        {page !== "evolutions" &&
          pokemon?.types.map((type) => {
            return <TypeChip type={type} key={type} size="small" />;
          })}
      </div>
    </div>
  );
};

export default PokemonCardDescription;
