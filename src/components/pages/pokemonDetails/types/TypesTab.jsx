//wrapper for types card
import { useState } from "react";

import useTypesContext from "../../../../hooks/useTypesContext";

import TypesHeader from "./TypesHeader";
import CardWrapper from "./CardWrapper";

import "../../../../blocks/TypesTab.css";

const TypesTab = ({ pokemon, isBreakpoint }) => {
  const [activeType, setActiveType] = useState("");
  const { index } = useTypesContext();

  const toggleActiveType = (target) => {
    setActiveType(target);
  };

  const typeToUse = index.find((type) => type.typeName === activeType);

  return (
    <section className="tabs__types types">
      <TypesHeader
        pokemon={pokemon}
        typeToggleFunction={toggleActiveType}
        activeType={activeType}
      />
      {!activeType && (
        <p className="types__select-message types__card">
          Select a type to see their strength and weaknesses!
        </p>
      )}
      {activeType && (
        <CardWrapper type={typeToUse} isBreakpoint={isBreakpoint} />
      )}
    </section>
  );
};

export default TypesTab;
