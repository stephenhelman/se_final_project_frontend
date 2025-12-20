const EvolutionConnector = ({ fromPos, toPos, orientation, sizes }) => {
  if (!fromPos || !toPos) return null;

  // horizontal only
  const x1 = fromPos.x + sizes.NODE_WIDTH;
  const y1 = fromPos.y + sizes.NODE_HEIGHT / 2;
  const x2 = toPos.x;
  const y2 = toPos.y + sizes.NODE_HEIGHT / 2;

  const width = Math.abs(x2 - x1);
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);

  const classes =
    orientation === "horizontal"
      ? "evolution__graph-line-horizontal"
      : "evolution__graph-line-vertical";

  return (
    <div
      className="evolution__connector"
      style={{ position: "absolute", left, top, width, height: 2 }}
    >
      <div className={classes} />
    </div>
  );
};

export default EvolutionConnector;
