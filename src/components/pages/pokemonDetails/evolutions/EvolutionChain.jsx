import usePan from "../../../../hooks/usePan";
import Button from "../../../universal/Button";

import EvolutionGraph from "./EvolutionGraph";

const EvolutionChain = ({ evolutionInfo, pokemon, onSelect }) => {
  const { pos, reset, bind } = usePan();
  return (
    <div className="evolution__wrapper">
      <div className="evolution__viewport" {...bind}>
        <div
          className="evolution__canvas"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <EvolutionGraph
            evolutionChain={evolutionInfo}
            selectedId={pokemon.id}
            onSelectNode={onSelect}
          />
        </div>
      </div>
      <div className="evolution__hint">
        <Button
          buttonCategory="primary"
          clickFunction={(e) => {
            e.stopPropagation();
            reset();
          }}
          buttonText="Reset"
        />
        <p className="evolution__hint-text">Drag to Pan</p>
      </div>
    </div>
  );
};

export default EvolutionChain;
