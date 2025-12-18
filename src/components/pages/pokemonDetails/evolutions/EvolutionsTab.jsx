//wrapper for evolutions sectino
import { useState } from "react";

import EvolutionInfo from "./EvolutionInfo";
import EvolutionChain from "./EvolutionChain";

const EvolutionsTab = ({ pokemon }) => {
  const [currentPokemon, setCurrentPokemon] = useState(pokemon);
  const edgeToUse = currentPokemon.evolution.edges.find((edge) => {
    return Number(edge.fromId) === Number(currentPokemon.id);
  });

  const handlePokemonClicked = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  //pass sprites/order/path into evolution chain
  //pass stats for leveling up to evolution info

  return (
    <section>
      <EvolutionChain pokemon={pokemon} />
      <EvolutionInfo />
    </section>
  );
};

export default EvolutionsTab;
