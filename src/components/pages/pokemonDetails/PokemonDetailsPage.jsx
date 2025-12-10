//wrapper for entire pokemon details page
import DetailsHeader from "./DetailsHeader";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import TabsPage from "./TabsPage";
import { pikachu, raichu, pikachuSprites } from "../../../utils/constants";

import "../../../blocks/PokemonDetailsPage.css";

const PokemonDetailsPage = () => {
  const pokemon = pikachu;
  pokemon.sprites = pikachuSprites;

  return (
    <main className="pokemon-details">
      <DetailsHeader pokemon={pokemon} />
      <section className="pokemon-details__wrapper">
        <PokemonInfo pokemon={pokemon} />
        <TabsPage pokemon={pokemon} />
      </section>
    </main>
  );
};

export default PokemonDetailsPage;
