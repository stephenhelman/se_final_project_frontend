//Type chip for each pokemon type (normal, fire, water, etc...)
import { capitalize } from "../../utils/utils";
import "../../blocks/TypeChip.css";
const TypeChip = ({ type, size, clickFunction = null, isActive }) => {
  const toggleActive = (target) => {
    if (!clickFunction) return;
    clickFunction("selectedTypes", target);
  };

  const style = {
    "--background-color": `var(--type-${type})`,
    "--border-color": `var(--type-${type})`,
    "--text-color": `var(--type-${type})`,
    "--hover-color": `var(--type-${type})`,
  };

  return (
    <button
      type="button"
      className={`type-chip type-chip_size_${size} type-chip_type_${type} ${
        isActive ? "type-chip_type_active" : ""
      }`}
      onClick={() => toggleActive(type)}
      style={style}
    >
      {capitalize(type)}
    </button>
  );
};

export default TypeChip;
