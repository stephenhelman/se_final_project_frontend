import EvolutionsTab from "./evolutions/EvolutionsTab";
import MovesTab from "./moves/MovesTab";
import PokemonInfo from "./pokemonInfo/PokemonInfo";
import StatsTab from "./stats/StatsTab";
import TypesTab from "./types/TypesTab";

const ActiveTab = ({ activeTab, pokemon, isBreakpoint }) => {
  return (
    <>
      {activeTab === "types" && (
        <TypesTab pokemon={pokemon} isBreakpoint={isBreakpoint} />
      )}
      {activeTab === "stats" && <StatsTab pokemon={pokemon} />}
      {activeTab === "evolutions" && <EvolutionsTab pokemon={pokemon} />}
      {activeTab === "moves" && (
        <MovesTab pokemon={pokemon} isBreakpoint={isBreakpoint} />
      )}
      {activeTab === "info" && (
        <PokemonInfo pokemon={pokemon} isBreakpoint={isBreakpoint} />
      )}
    </>
  );
};

export default ActiveTab;
