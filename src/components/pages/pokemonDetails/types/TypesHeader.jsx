import { formatNameOwnership } from "../../../../utils/utils";
import TypeChip from "../../../universal/TypeChip";

const TypesHeader = ({ pokemon, typeToggleFunction, activeType }) => {
  const types = pokemon.types.map((type, index) => {
    if (activeType === type) {
      return (
        <li key={index} className="types-tab__list-item">
          <TypeChip
            type={type}
            size="large"
            clickFunction={() => typeToggleFunction(type)}
            isActive={true}
          />
        </li>
      );
    }
    return (
      <li key={index} className="types-tab__list-item">
        <TypeChip
          type={type}
          size="large"
          clickFunction={() => typeToggleFunction(type)}
          isActive={false}
        />
      </li>
    );
  });
  return (
    <div className="types-tab__header">
      <p className="types-tab__title">
        {formatNameOwnership(pokemon.name)} types
      </p>
      <ul className="types-tab__types">{types}</ul>
    </div>
  );
};

export default TypesHeader;
