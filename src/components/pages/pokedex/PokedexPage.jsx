import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";
import { useData } from "../../../hooks/useData";
import { useState } from "react";
import useForm from "../../../hooks/useForm";

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

  const { index, isLoading } = useData();

  if (isLoading || !index) return <Preloader />;

  const pokemon = index
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(values.search.toLowerCase())
    )
    .filter((pokemon) =>
      filterTypes.every((type) => pokemon.types.includes(type))
    );

  return (
    <main className="pokedex">
      <Sidebar handleFilterTypes={handleFilterTypes} />
      <ContentWrapper
        title="Pokédex"
        page="pokedex"
        searchPlaceholder="Search Pokemon"
        values={values}
        handleChange={handleChange}
      >
        <PokedexGrid cardType="pokedex" size="large" pokemon={pokemon} />
      </ContentWrapper>
    </main>
  );
};

export default PokedexPage;
