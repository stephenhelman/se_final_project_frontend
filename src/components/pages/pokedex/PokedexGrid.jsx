import PokemonCard from "../../universal/PokemonCard/PokemonCard";

const PokedexGrid = ({ pokemonArray }) => {
  const content = pokemonArray.map((pokemon) => {
    return <PokemonCard pokemon={pokemon} key={pokemon.id} cardType="large" />;
  });
  return content;
};

export default PokedexGrid;
