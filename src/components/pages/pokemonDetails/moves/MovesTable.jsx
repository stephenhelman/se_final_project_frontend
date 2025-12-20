//table to hold all moves

import MovesHeader from "./MovesHeader";
import MovesRow from "./MovesRow";

const MovesTable = ({ moves, type }) => {
  let sortedMoves;
  if (type === "level-up") {
    sortedMoves = moves.sort((a, b) => a.level - b.level);
  }
  if (type === "machine") {
    sortedMoves = moves.sort((a, b) => {
      const numA = parseInt(a.level.substring(2));
      const numB = parseInt(b.level.substring(2));

      const prefixA = a.level.substring(0, 2);
      const prefixB = b.level.substring(0, 2);

      if (prefixA > prefixB) {
        return -1;
      }
      if (prefixA < prefixB) {
        return 1;
      }

      return numA - numB;
    });
  }

  const moveContent = sortedMoves.map((move, i) => {
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
