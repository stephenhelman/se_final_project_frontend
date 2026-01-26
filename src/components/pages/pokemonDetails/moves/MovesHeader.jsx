const MovesHeader = ({ type }) => {
  return (
    <tr className="table__row table__row_head">
      <th className="table__cell table__cell_head">
        {type === "level-up" ? "LVL" : "TM/HM"}
      </th>
      <th className="table__cell table__cell_head">Name</th>
      <th className="table__cell table__cell_head">Type</th>
      <th className="table__cell table__cell_head">Class</th>
      <th className="table__cell table__cell_head">Accuracy</th>
      <th className="table__cell table__cell_head">Power</th>
      <th className="table__cell table__cell_head">PP</th>
      <th className="table__cell table__cell_head">Info</th>
    </tr>
  );
};

export default MovesHeader;
