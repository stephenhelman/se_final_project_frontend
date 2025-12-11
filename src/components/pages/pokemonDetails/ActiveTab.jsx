import EvolutionsTab from "./evolutions/EvolutionsTab";
import MovesTab from "./moves/MovesTab";
import StatsTab from "./stats/StatsTab";
import TypesTab from "./types/TypesTab";

const ActiveTab = ({ activeTab, pokemon }) => {
  return (
    <>
      {activeTab === "types" && <TypesTab pokemon={pokemon} />}
      {activeTab === "stats" && <StatsTab pokemon={pokemon} />}
      {activeTab === "evolutions" && <EvolutionsTab pokemon={pokemon} />}
      {activeTab === "moves" && <MovesTab pokemon={pokemon} />}
    </>
  );
};

export default ActiveTab;
