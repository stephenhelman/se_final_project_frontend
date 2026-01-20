//displays information on evolution requriements
import InfoRow from "./InfoRow";

const EvolutionInfo = ({ edge, currentPokemon }) => {
  let content;
  const activeKeys = Object.keys(edge.edge)
    .filter((key) => {
      return edge.edge[key] !== null;
    })
    .filter((key) => {
      return key !== "toId" && key !== "fromId";
    });
  content = activeKeys.map((key, i) => {
    if (i === 2) {
      return (
        <div key={i}>
          <p className="evolution__info-sub-header">Additional Info</p>
          {typeof edge.edge[key] === "object" ? (
            <InfoRow title={key} key={i} value={edge.edge[key].name} />
          ) : (
            <InfoRow title={key} key={i} value={edge.edge[key]} />
          )}
        </div>
      );
    }
    if (typeof edge.edge[key] === "object") {
      return <InfoRow title={key} key={i} value={edge.edge[key].name} />;
    }

    return <InfoRow title={key} key={i} value={edge.edge[key]} />;
  });

  return (
    <div className="evolution__info">
      <div className="evolution__info-header">
        <h4 className="evolution__info-header-title">Name + ID</h4>
        <div className="evolution__info-header-wrapper">
          <h4 className="evolution__info-header-name">{currentPokemon.name}</h4>
          <h4 className="evolution__info-header-id">
            {currentPokemon.formattedId}
          </h4>
        </div>
      </div>
      {content}
    </div>
  );
};

export default EvolutionInfo;
