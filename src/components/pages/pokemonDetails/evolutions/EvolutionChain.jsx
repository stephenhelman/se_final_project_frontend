import EvolutionGraph from "./EvolutionGraph";

const EvolutionChain = ({ evolutionInfo, pokemon, onSelect }) => {
  return (
    <div className="evolution__content">
      <EvolutionGraph
        evolutionChain={evolutionInfo}
        selectedId={pokemon.id}
        onSelectNode={onSelect}
      />
    </div>
  );
};

export default EvolutionChain;
