const EvolutionBranchConnector = ({ parentPos, childPositions, sizes }) => {
  if (!parentPos || !childPositions.length) return null;

  const parentCenterX = parentPos.x + sizes.NODE_WIDTH / 2;
  const parentBottomY = parentPos.y + sizes.NODE_HEIGHT;

  const xs = childPositions.map((p) => p.x + sizes.NODE_WIDTH / 2);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  // vertical from parent down
  const verticalLength = 20;
  const horizontalY = parentBottomY + verticalLength;

  return (
    <>
      {/* parent vertical */}
      <div
        className="evolution__graph-line-vertical"
        style={{
          position: "absolute",
          left: parentCenterX,
          top: parentBottomY,
          height: verticalLength,
        }}
      />

      {/* horizontal bar */}
      <div
        className="evolution__graph-line-horizontal"
        style={{
          position: "absolute",
          left: minX,
          top: horizontalY,
          width: maxX - minX,
        }}
      />

      {/* child verticals */}
      {childPositions.map((pos, idx) => {
        const x = pos.x + sizes.NODE_WIDTH / 2;
        const childTop = pos.y;
        return (
          <div
            key={idx}
            className="evolution__graph-line-vertical"
            style={{
              position: "absolute",
              left: x,
              top: horizontalY,
              height: childTop - horizontalY,
            }}
          />
        );
      })}
    </>
  );
};

export default EvolutionBranchConnector;
