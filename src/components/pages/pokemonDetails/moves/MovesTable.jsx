//table to hold all moves

import MovesHeader from "./MovesHeader";
import MovesRow from "./MovesRow";

const MovesTable = ({ moves, type }) => {
  const moveContent = moves
    .sort((a, b) => a.level - b.level)
    .map((move, i) => {
      return <MovesRow key={i} move={move} />;
    });
  return (
    <table className="moves__table table">
      <thead className="table__head">
        <MovesHeader type={type} />
      </thead>
      <tbody className="table__body">{moveContent}</tbody>
    </table>
  );
};

export default MovesTable;
