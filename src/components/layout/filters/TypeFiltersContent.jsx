import TypeFiltersRow from "./TypeFiltersRow";
import { pokemonGroupTypes } from "../../../utils/constants";

const TypeFiltersContent = ({ filterFunction }) => {
  const content = pokemonGroupTypes.map((groupType) => {
    return (
      <TypeFiltersRow
        key={groupType.id}
        label={groupType.label}
        types={groupType.types}
        filterFunction={filterFunction}
      />
    );
  });
  return <ul className="sidebar__filters-container">{content}</ul>;
};

export default TypeFiltersContent;
