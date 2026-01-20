//wrapper for entire pokemon details page
import DetailsHeader from "./DetailsHeader";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import TabsPage from "./TabsPage";
import Preloader from "../../universal/Preloader";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useAppData from "../../../hooks/useAppData";
import { updateEvolutionNodes } from "../../../utils/pokemonUtils";

import "../../../blocks/PokemonDetailsPage.css";

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    pokemon: pokemonList,
    getPokemonDetails,
    isLoading,
    error,
    toggleFavorite,
  } = useAppData();

  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const currentPokemon = pokemonList.find((p) => p.id === Number(id));

  useEffect(() => {
    if (isLoading || !pokemonList) return;
    const loadDetails = async () => {
      setDetailsLoading(true);
      try {
        const details = await getPokemonDetails(Number(id));
        setDetailedPokemon(details);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setDetailsLoading(false);
      }
    };

    loadDetails();
  }, [id, isLoading, getPokemonDetails, pokemonList]);

  if (isLoading || detailsLoading || !detailedPokemon) {
    return <Preloader />;
  }

  const evolutionData = detailedPokemon.evolution;
  const pokemonWithEvolution = {
    ...detailedPokemon,
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
    toggleFavorite(Number(id));
  };

  return (
    <main className="pokemon-details">
      <DetailsHeader
        pokemon={pokemonWithEvolution}
        isFavorite={currentPokemon?.isFavorite}
        handleToggleFavorite={handleToggleFavorite}
        handleNavigateBack={handleBackButtonClicked}
      />
      <section className="pokemon-details__wrapper">
        <PokemonInfo pokemon={pokemonWithEvolution} />
        <TabsPage pokemon={pokemonWithEvolution} />
      </section>
    </main>
  );
};

export default PokemonDetailsPage;
