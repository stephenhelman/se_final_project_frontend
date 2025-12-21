import useDataContext from "../../../hooks/useDataContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import useScrollSaver from "../../../hooks/useScrollSaver";
import { pokemonSortOptions } from "../../../utils/constants";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";

import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  const {
    values,
    handleChange,
    toggleInArray,
    toggleState,
    handleSelect,
    clearArray,
  } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "id-asc",
    favoritesOnly: false,
  });

  const { scrollRef, saveScrollPosition } = useScrollSaver("pokedex");

  const { pokemonList, isLoading } = useDataContext();

  const visiblePokemon = useSort(pokemonList, values);

  if (isLoading || !pokemonList) return <Preloader />;

  return (
    <PageLayout
      mainClass="pokedex"
      filterFunction={toggleInArray}
      title="Pokedex"
      page="pokedex"
      searchPlaceholder="Search Pokemon by name or ID"
      values={values}
      handleChange={handleChange}
      toggleState={toggleState}
      sortOptions={pokemonSortOptions}
      handleSelect={handleSelect}
      clearArray={clearArray}
    >
      <PokedexGrid
        cardType="pokedex"
        size="large"
        pokemon={visiblePokemon}
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
      />
    </PageLayout>
  );
};

export default PokedexPage;
