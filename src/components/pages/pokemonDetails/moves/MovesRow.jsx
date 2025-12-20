//a single move
import TypeChip from "../../../universal/TypeChip";
import Button from "../../../universal/Button";

import { normalizeMachineName, capitalize } from "../../../../utils/utils";

const MovesRow = ({ move }) => {
  const level = normalizeMachineName(move.level);
  return (
    <tr className="table__row table__row_body">
      <td className="table__cell table__cell_body">{level}</td>
      <td className="table__cell table__cell_body">{capitalize(move.name)}</td>
      <td className="table__cell table__cell_body">
        <TypeChip type={move.type} size="medium" />
      </td>
      <td className="table__cell table__cell_body">
        {capitalize(move.category)}
      </td>
      <td className="table__cell table__cell_body">
        {move.accuracy ? move.accuracy : "-"}
      </td>
      <td className="table__cell table__cell_body">
        {move.power ? move.power : "-"}
      </td>
      <td className="table__cell table__cell_body">
        {move.pp ? move.pp : "-"}
      </td>
      <td className="table__cell table__cell_body">
        <Button buttonCategory="icon" buttonIcon="infoIcon" />
      </td>
    </tr>
  );
};

export default MovesRow;
