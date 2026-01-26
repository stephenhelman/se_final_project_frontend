import BaseStats from "./BaseStats";
import Attributes from "./Attributes";

import "../../../../blocks/StatsTab.css";

const StatsTab = ({ pokemon }) => {
  return (
    <section className="tabs__stats stats">
      <BaseStats pokemon={pokemon} />
      <Attributes pokemon={pokemon} />
    </section>
  );
};

export default StatsTab;
