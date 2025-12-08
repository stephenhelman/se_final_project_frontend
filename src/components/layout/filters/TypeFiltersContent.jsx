import TypeFiltersRow from "./TypeFiltersRow";
import { pokemonGroupTypes } from "../../../utils/constants";

const TypeFiltersContent = () => {
  const content = pokemonGroupTypes.map((groupType) => {
    return (
      <TypeFiltersRow
        key={groupType.id}
        label={groupType.label}
        types={groupType.types}
      />
    );
  });
  return <ul>{content}</ul>;
};

export default TypeFiltersContent;
