import { formatKeyTitle } from "../../../../utils/utils";
import TypeChip from "../../../universal/TypeChip";

const CardRow = ({ stat }) => {
  let types;
  if (!stat[1].length) {
    types = (
      <li className="types-tab__list-item">
        <TypeChip type="none" size="small" isActive="false" />
      </li>
    );
  } else {
    types = stat[1].map((type, index) => {
      return (
        <li key={index} className="types-tab__list-item">
          <TypeChip type={type} size="small" isActive={false} />
        </li>
      );
    });
  }
  return (
    <>
      <p className="types-tab__stat-title">{formatKeyTitle(stat[0])}</p>
      <ul className="types-tab__stat-chips-wrapper">{types}</ul>
    </>
  );
};

export default CardRow;
