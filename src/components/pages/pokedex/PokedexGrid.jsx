import PokemonCard from "../../universal/PokemonCard/PokemonCard";
import { mockPokemon } from "../../../utils/constants";

const PokedexGrid = () => {
  const content = mockPokemon.map((pokemon) => {
    return (
      <PokemonCard
        pokemon={pokemon}
        key={pokemon.id}
        cardType="pokedex"
        size="large"
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
