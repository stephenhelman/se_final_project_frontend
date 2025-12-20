//wrapper for evolutions sectino
import { useState } from "react";

import EvolutionInfo from "./EvolutionInfo";
import EvolutionChain from "./EvolutionChain";

import { chooseEdge } from "../../../../utils/utils";

import "../../../../blocks/Evolution.css";

const EvolutionsTab = ({ pokemon }) => {
  const [currentPokemon, setCurrentPokemon] = useState(() => {
    return pokemon.evolution.nodes.find(
      (node) => Number(node.id) === Number(pokemon.id)
    );
  });

  const edgeToUse = chooseEdge(currentPokemon, pokemon);

  if (edgeToUse.root === false && edgeToUse.edge.method === "level-up") {
    const minLevel = edgeToUse.edge.minLevel;
    edgeToUse.edge.expRequired =
      pokemon.growthRate.levels[minLevel - 1].experience;
  }

  const handlePokemonClicked = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  //pass sprites/order/path into evolution chain
  //pass stats for leveling up to evolution info

  return (
    <section className="tabs__evolution evolution">
      <EvolutionChain
        evolutionInfo={pokemon.evolution}
        pokemon={currentPokemon}
        onSelect={handlePokemonClicked}
      />
      <EvolutionInfo edge={edgeToUse} currentPokemon={currentPokemon} />
    </section>
  );
};

export default EvolutionsTab;
