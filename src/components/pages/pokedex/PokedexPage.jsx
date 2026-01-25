import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import useWindowWidth from "../../../hooks/useWindowWidth";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useAppData from "../../../hooks/useAppData";

import Button from "../../universal/Button";
import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import Grid from "../../universal/Grid";
import SortMenu from "../../universal/SortMenu";
import PokemonCard from "../../universal/PokemonCard/PokemonCard";

import { pokemonSortOptions } from "../../../utils/constants";
import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  const {
    values,
    handleChange,
    toggleInArray,
    toggleState,
    handleSelect,
    clearArray,
    handleReset,
  } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "id-asc",
    favoritesOnly: false,
  });

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleShowFilterMenuClicked = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const { isMobile, isTablet, isDesktop } = useWindowWidth();

  const { pokemon, isLoading, toggleFavorite } = useAppData();

  const visiblePokemon = useSort(pokemon, values);

  const navigate = useNavigate();

  const { scrollRef, saveScrollPosition } = useScrollSaver(`pokedex-scroll`);

  if (isLoading /* || !pokemon */) return <Preloader />;

  const favoritesButton = (
    <Button
      key="favorites"
      buttonCategory={values.favoritesOnly ? "primary" : "ghost"}
      buttonText="Favorites"
      buttonType="button"
      clickFunction={() => toggleState("favoritesOnly")}
      isActive={values.favoritesOnly}
    />
  );

  const sortButton = (
    <SortMenu
      key="sort-menu"
      sortOptions={pokemonSortOptions}
      handleSelect={handleSelect}
      values={values}
    />
  );

  const mobileFilterButton = (
    <Button
      buttonCategory="icon"
      buttonIcon="filterIcon"
      size="lg"
      clickFunction={handleShowFilterMenuClicked}
    />
  );

  let buttons;
  if (isMobile || isTablet) {
    buttons = [mobileFilterButton];
  } else {
    buttons = [sortButton, favoritesButton];
  }

  let size;
  if (isDesktop || isTablet) {
    size = "medium";
  } else if (isMobile) {
    size = "small";
  } else {
    size = "large";
  }

  const pokemonElements = visiblePokemon.map((element, i) => {
    const handleInfoClick = () => {
      saveScrollPosition();
      navigate(`/pokemon/${element.id}`, {
        state: { from: location.pathname },
      });
    };
    const handleToggleFavorite = () => {
      toggleFavorite(element.id);
    };

    return (
      <PokemonCard
        pokemon={element}
        key={i}
        onInfo={handleInfoClick}
        onFavorite={handleToggleFavorite}
        page="pokedex"
        isMobile={isMobile}
        isTablet={isTablet}
      />
    );
  });

  return (
    <>
      <PageLayout
        filterFunction={toggleInArray}
        title="Pokedex"
        page="pokedex"
        searchPlaceholder="Search Pokemon by name or ID"
        values={values}
        handleChange={handleChange}
        handleSelect={handleSelect}
        clearArray={clearArray}
        buttons={buttons}
        showFilterMenu={showFilterMenu}
        toggleState={toggleState}
        handleReset={handleReset}
      >
        <Grid
          elements={pokemonElements}
          page="pokedex"
          size={size}
          scrollRef={scrollRef}
        />
      </PageLayout>
    </>
  );
};

export default PokedexPage;
