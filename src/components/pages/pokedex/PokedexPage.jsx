import { useState } from "react";

import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { pokemonSortOptions } from "../../../utils/constants";
import Button from "../../universal/Button";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";

import "../../../blocks/Pokedex.css";
import useAppData from "../../../hooks/useAppData";
import SortMenu from "../../universal/SortMenu";

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

  const handleShoeFilterMenuClicked = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const { scrollRef, saveScrollPosition } = useScrollSaver("pokedex-scroll");

  const { isMobile, isTablet } = useWindowWidth();

  const { pokemon, isLoading } = useAppData();

  const visiblePokemon = useSort(pokemon, values);

  if (isLoading || !pokemon) return <Preloader />;

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
      clickFunction={handleShoeFilterMenuClicked}
    />
  );

  let buttons;
  if (isMobile || isTablet) {
    buttons = [mobileFilterButton];
  } else {
    buttons = [sortButton, favoritesButton];
  }

  return (
    <>
      <PageLayout
        mainClass="pokedex"
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
        <PokedexGrid
          cardType="pokedex"
          size="large"
          pokemon={visiblePokemon}
          scrollRef={scrollRef}
          saveScrollPosition={saveScrollPosition}
        />
      </PageLayout>
    </>
  );
};

export default PokedexPage;
