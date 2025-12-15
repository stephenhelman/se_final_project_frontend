import PokemonCard from "../../universal/PokemonCard/PokemonCard";

const PokedexGrid = ({
  size,
  cardType,
  pokemon,
  lengthOfTeam,
  addToArray,
  removeFromArray,
}) => {
  const content = pokemon.map((pokemon) => {
    return (
      <li className="pokedex__list-item" key={pokemon.id}>
        <PokemonCard
          pokemon={pokemon}
          cardType={cardType}
          size={size}
          lengthOfTeam={lengthOfTeam}
          addToArray={addToArray}
          removeFromArray={removeFromArray}
        />
      </li>
    );
  });
  return (
    <div className="pokedex__wrapper">
      <ul className={`pokedex__grid pokedex__grid_type_${cardType}`}>
        {content}
      </ul>
    </div>
  );
};

export default PokedexGrid;
