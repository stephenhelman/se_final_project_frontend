import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import DetailsHeader from "./DetailsHeader";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import TabsPage from "./TabsPage";
import Preloader from "../../universal/Preloader";
import MobileDetailsPage from "./MobileDetailsPage";

import useAppData from "../../../hooks/useAppData";
import useGlobalError from "../../../hooks/useGlobalError";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { updateEvolutionNodes } from "../../../utils/pokemonUtils";

import "../../../blocks/PokemonDetailsPage.css";

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { showError } = useGlobalError();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowWidth();

  const {
    pokemon: pokemonList,
    getPokemonDetails,
    isLoading,
    toggleFavorite,
  } = useAppData();

  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const currentPokemon = pokemonList.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!id || isLoading) return;
    setDetailedPokemon(null);
    setDetailsLoading(true);
    const loadDetails = async () => {
      setDetailsLoading(true);
      try {
        const details = await getPokemonDetails(Number(id));
        setDetailedPokemon(details);
      } catch (error) {
        showError(error);
      } finally {
        setDetailsLoading(false);
      }
    };

    loadDetails();
  }, [id, isLoading, getPokemonDetails, pokemonList, showError]);

  const pokemonWithEvolution = useMemo(() => {
    if (!detailedPokemon) return null;
    const evolutionData = detailedPokemon.evolution;

    if (!evolutionData || !evolutionData.nodes) {
      return detailedPokemon;
    }
    return {
      ...detailedPokemon,
      evolution: {
        ...evolutionData,
        nodes: updateEvolutionNodes(evolutionData, pokemonList),
      },
    };
  }, [detailedPokemon, pokemonList]);

  if (isLoading || detailsLoading || !detailedPokemon || !pokemonList) {
    return <Preloader />;
  }

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

      <section className="pokemon-details__content">
        {isMobile || isTablet ? (
          <MobileDetailsPage
            pokemon={pokemonWithEvolution}
            isBreakpoint={Boolean(isMobile || isTablet)}
          />
        ) : (
          <>
            <PokemonInfo pokemon={pokemonWithEvolution} />
            <TabsPage pokemon={pokemonWithEvolution} />
          </>
        )}
      </section>
    </main>
  );
};

export default PokemonDetailsPage;
