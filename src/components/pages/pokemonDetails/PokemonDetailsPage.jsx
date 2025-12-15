//wrapper for entire pokemon details page
import DetailsHeader from "./DetailsHeader";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import TabsPage from "./TabsPage";
import Preloader from "../../universal/Preloader";

import "../../../blocks/PokemonDetailsPage.css";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../../hooks/useDataContext";
import usePokemonDetails from "../../../hooks/usePokemonDetails";

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const { pokemonList, isLoading } = useDataContext();

  const lightPokemon = pokemonList?.find((item) => item.id === Number(id));
  const { pokemon, isLoading: sessionLoading } = usePokemonDetails(
    id,
    lightPokemon
  );

  if (isLoading || sessionLoading || !pokemon || !Object.keys(pokemon).length)
    return <Preloader />;

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
