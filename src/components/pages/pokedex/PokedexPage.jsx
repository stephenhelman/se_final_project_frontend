import { useState } from "react";

import { useDataContext } from "../../../hooks/useDataContext";
import useForm from "../../../hooks/useForm";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";

import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  const [filterTypes, setFilterTypes] = useState([]);
  const { values, handleChange } = useForm({
    search: "",
  });

  const handleFilterTypes = (filter) => {
    if (filterTypes.includes(filter)) {
      return setFilterTypes((prev) =>
        prev.filter((type) => {
          return type.toLowerCase() !== filter.toLowerCase();
        })
      );
    }

    setFilterTypes((prev) => [...prev, filter]);
  };

  const { pokemonList, isLoading } = useDataContext();

  if (isLoading || !pokemonList) return <Preloader />;

  const pokemon = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(values.search.toLowerCase())
    )
    .filter((pokemon) =>
      filterTypes.every((type) => pokemon.types.includes(type))
    );

  return (
    <PageLayout
      mainClass="pokedex"
      filterFunction={handleFilterTypes}
      title="Pokedex"
      page="pokedex"
      searchPlaceholder="Search Pokemon"
      values={values}
      handleChange={handleChange}
    >
      <PokedexGrid cardType="pokedex" size="large" pokemon={pokemon} />
    </PageLayout>
  );
};

export default PokedexPage;
