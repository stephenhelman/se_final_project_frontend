const StatBar = ({ stat }) => {
  const width = stat / 255;

  return (
    <div className="stats__stat-bar-wrapper">
      <div className="stats__stat-bar" style={{ "--stat-value": width }}></div>
    </div>
  );
};

export default StatBar;
