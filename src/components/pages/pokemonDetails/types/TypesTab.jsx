//wrapper for types card
import { useState } from "react";

import { useTypesContext } from "../../../../hooks/useTypesContext";

import TypesHeader from "./TypesHeader";
import CardWrapper from "./CardWrapper";

import "../../../../blocks/TypesTab.css";

const TypesTab = ({ pokemon }) => {
  const [activeType, setActiveType] = useState(pokemon.types[0]);
  const { index } = useTypesContext();

  const toggleActiveType = (target) => {
    setActiveType(target);
  };

  const typeToUse = index.find((type) => type.typeName === activeType);

  return (
    <section className="pokemon-details__types-tab types-tab">
      <TypesHeader
        pokemon={pokemon}
        typeToggleFunction={toggleActiveType}
        activeType={activeType}
      />
      {!activeType && (
        <p className="types-tab__select-message types-tab__card">
          Select a type to see their strength and weaknesses!
        </p>
      )}
      {activeType && <CardWrapper type={typeToUse} />}
    </section>
  );
};

export default TypesTab;
