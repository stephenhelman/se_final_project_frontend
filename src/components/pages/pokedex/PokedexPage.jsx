import { useDataContext } from "../../../hooks/useDataContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import { pokemonSortOptions } from "../../../utils/constants";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";

import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  const { values, handleChange, toggleInArray, toggleState, handleSelect } =
    useForm({
      selectedTypes: [],
      searchTerm: "",
      sortBy: "id",
      favoritesOnly: false,
    });

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
    >
      <PokedexGrid cardType="pokedex" size="large" pokemon={visiblePokemon} />
    </PageLayout>
  );
};

export default PokedexPage;
