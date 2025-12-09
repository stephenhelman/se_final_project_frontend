//Type chip for each pokemon type (normal, fire, water, etc...)
import { capitalize } from "../../utils/utils";
import "../../blocks/TypeChip.css";
const TypeChip = ({ type, size }) => {
  return (
    <button
      type="button"
      className={`type-chip type-chip_size_${size} type-chip_type_${type}`}
    >
      {capitalize(type)}
    </button>
  );
};

export default TypeChip;
