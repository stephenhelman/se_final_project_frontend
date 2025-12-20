import { useMemo } from "react";

import EvolutionNode from "./EvolutionNode";
import EvolutionConnector from "./EvolutionConnector";
import EvolutionBranchConnector from "./EvolutionBranchConnector";

import {
  buildLevels,
  buildLayout,
  findLongestArray,
} from "../../../../utils/utils";
import { sizes } from "../../../../utils/constants";

// approx height

const EvolutionGraph = ({ evolutionChain, selectedId, onSelectNode }) => {
  const { nodes = [], edges = [], path } = evolutionChain;
  const isLinear = path === "linear";

  // For linear: ignore BFS levels & just sort along chain order
  const linearNodes = useMemo(
    () =>
      isLinear
        ? [...nodes].sort((a, b) => a.id - b.id) // or your chain order
        : null,
    [isLinear, nodes]
  );

  // For branching: use your existing buildLevels
  const levels = useMemo(
    () => (!isLinear ? buildLevels(evolutionChain) : []),
    [isLinear, evolutionChain]
  );

  const positions = useMemo(() => {
    if (isLinear && linearNodes) {
      // simple row layout
      const pos = {};
      linearNodes.forEach((node, index) => {
        pos[node.id] = {
          x: index * (sizes.NODE_WIDTH + sizes.LEVEL_GAP),
          y: 0,
        };
      });
      return pos;
    }
    // branching – use level-based layout
    return buildLayout(levels.levels, sizes);
  }, [isLinear, linearNodes, levels]);

  const edgesByParent = useMemo(() => {
    const map = new Map();
    edges.forEach((edge) => {
      if (!map.has(edge.fromId)) map.set(edge.fromId, []);
      map.get(edge.fromId).push(edge);
    });
    return map;
  }, [edges]);

  const longestArray = isLinear
    ? linearNodes.length
    : findLongestArray(...levels.levels).length;

  const style = {
    "--graph-height": isLinear
      ? `${sizes.NODE_HEIGHT}px`
      : `${
          levels.levels.length * sizes.NODE_HEIGHT +
          (levels.levels.length - 1) * sizes.ROW_GAP
        }px`,
    "--graph-width": `${
      longestArray * sizes.NODE_WIDTH + (longestArray - 1) * sizes.LEVEL_GAP
    }px`,
  };

  return (
    <div
      style={style}
      className={`evolution__graph evolution__graph_type_${path}`}
    >
      <div className="evolution__graph-levels">
        {isLinear ? (
          <div className="evolution__graph-row">
            {linearNodes.map((node) => (
              <EvolutionNode
                key={node.id}
                pokemon={node}
                position={positions[node.id]}
                isSelected={Number(node.id) === Number(selectedId)}
                onSelect={onSelectNode}
                sizes={sizes}
              />
            ))}
          </div>
        ) : (
          levels.levels.map((levelNodes, levelIndex) => (
            <div key={levelIndex} className="evolution__graph-column">
              {levelNodes.map((node) => (
                <EvolutionNode
                  key={node.id}
                  pokemon={node}
                  position={positions[node.id]}
                  isSelected={Number(node.id) === Number(selectedId)}
                  onSelect={onSelectNode}
                  sizes={sizes}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <div className="evolution__graph-connectors">
        {isLinear
          ? // simple pairwise connectors
            linearNodes
              .slice(0, -1)
              .map((node, idx) => (
                <EvolutionConnector
                  key={node.id}
                  fromPos={positions[node.id]}
                  toPos={positions[linearNodes[idx + 1].id]}
                  orientation="horizontal"
                  sizes={sizes}
                />
              ))
          : [...edgesByParent.entries()].map(([fromId, edgeGroup]) => (
              <EvolutionBranchConnector
                key={fromId}
                parentPos={positions[fromId]}
                childPositions={edgeGroup.map((e) => positions[e.toId])}
                sizes={sizes}
              />
            ))}
      </div>
    </div>
  );
};

export default EvolutionGraph;
