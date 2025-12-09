import PokemonCard from "../../universal/PokemonCard/PokemonCard";

const PokedexGrid = ({ size, cardType, pokemon }) => {
  const content = pokemon.map((pokemon) => {
    return (
      <PokemonCard
        pokemon={pokemon}
        key={pokemon.id}
        cardType={cardType}
        size={size}
      />
    );
  });
  return (
    <div className="pokedex__wrapper">
      <section className="pokedex__grid">{content}</section>
    </div>
  );
};

export default PokedexGrid;
