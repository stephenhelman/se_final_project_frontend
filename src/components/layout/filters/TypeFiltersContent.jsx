import TypeFiltersRow from "./TypeFiltersRow";
import { pokemonGroupTypes } from "../../../utils/constants";

const TypeFiltersContent = ({ handleFilterTypes }) => {
  const content = pokemonGroupTypes.map((groupType) => {
    return (
      <TypeFiltersRow
        key={groupType.id}
        label={groupType.label}
        types={groupType.types}
        handleFilterTypes={handleFilterTypes}
      />
    );
  });
  return <ul className="sidebar__filters-container">{content}</ul>;
};

export default TypeFiltersContent;
