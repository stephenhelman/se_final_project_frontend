//wrapper for entire pokemon details page
import DetailsHeader from "./DetailsHeader";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import TabsPage from "./TabsPage";
import Preloader from "../../universal/Preloader";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useDataContext from "../../../hooks/useDataContext";
import usePokemonDetails from "../../../hooks/usePokemonDetails";
import { updateEvolutionNodes } from "../../../utils/pokemonUtils";

import "../../../blocks/PokemonDetailsPage.css";

const PokemonDetailsPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pokemonList, isLoading, toggleFavoriteLocal } = useDataContext();

  const lightPokemon = pokemonList?.find((item) => item.id === Number(id));
  const {
    pokemon,
    isLoading: sessionLoading,
    toggleFavoriteSession,
  } = usePokemonDetails(id, lightPokemon);

  useEffect(() => {
    if (isLoading || sessionLoading) return;
    setIsFavorite(pokemon.isFavorite);
  }, [isLoading, sessionLoading, pokemon]);

  if (isLoading || sessionLoading || !pokemon || !Object.keys(pokemon).length)
    return <Preloader />;

  const evolutionData = pokemon.evolution;
  const newPokemon = {
    ...pokemon,
    evolution: {
      ...evolutionData,
      nodes: updateEvolutionNodes(evolutionData, pokemonList),
    },
  };

  const handleBackButtonClicked = () => {
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate("/");
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toggleFavoriteLocal(pokemon.id, !isFavorite);
    toggleFavoriteSession(!isFavorite);
  };

  return (
    <main className="pokemon-details">
      <DetailsHeader
        pokemon={pokemon}
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
        handleNavigateBack={handleBackButtonClicked}
      />
      <section className="pokemon-details__wrapper">
        <PokemonInfo pokemon={pokemon} />
        <TabsPage pokemon={newPokemon} />
      </section>
    </main>
  );
};

export default PokemonDetailsPage;
