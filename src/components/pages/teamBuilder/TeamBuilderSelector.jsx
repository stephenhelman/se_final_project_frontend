import { useNavigate } from "react-router-dom";

import Searchbar from "../../universal/SearchBar";
import Grid from "../../universal/Grid";
import Button from "../../universal/Button";

import useSort from "../../../hooks/useSort";

import PokemonCard from "../../universal/PokemonCard/PokemonCard";

const TeamBuilderSelector = ({
  values,
  handleChange,
  data,
  selectedPokemon,
  onTeamChange,
  buttons,
  scrollRef,
  saveScrollPosition,
  activePanel,
  isMobile,
  isTablet,
}) => {
  const navigate = useNavigate();

  let pokemon = data;

  const clearPokemonTeam = () => {
    pokemon = data.map((item) => {
      return { ...item, isOnTeam: false, count: 0 };
    });

    onTeamChange("clear", { name: "players" });
  };

  const visiblePokemon = useSort(pokemon, values);

  const pokemonElements = visiblePokemon.map((element, index) => {
    const handleInfoClick = () => {
      saveScrollPosition();
      navigate(`/pokemon/${element.id}`, {
        state: { from: location.pathname },
      });
    };
    return (
      <PokemonCard
        pokemon={element}
        key={index}
        lengthOfTeam={selectedPokemon.length}
        onTeamChange={onTeamChange}
        onInfo={handleInfoClick}
        page="team-builder"
        isMobile={isMobile}
        isTablet={isTablet}
      />
    );
  });

  return (
    <section
      className={`team-builder__content ${activePanel === "team-selector" ? "team-builder__selector team-builder__selector_visible" : "team-builder__selector"}`}
    >
      <Searchbar
        placeholder="Search Pokemon for your team..."
        values={values}
        handleChange={handleChange}
        buttons={buttons}
      />
      <header className="team-builder__selector-header">
        <h3 className="team-builder__selector-title">
          {selectedPokemon.length} / 6 Pokemon Selected
        </h3>
        <Button
          buttonCategory="ghost"
          buttonType="button"
          buttonText="Clear"
          clickFunction={clearPokemonTeam}
        />
      </header>
      <Grid
        elements={pokemonElements}
        page="team-builder"
        scrollRef={scrollRef}
      />
    </section>
  );
};

export default TeamBuilderSelector;
