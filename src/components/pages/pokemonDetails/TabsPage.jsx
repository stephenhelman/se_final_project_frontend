import Tabs from "./Tabs";
import ActiveTab from "./ActiveTab";

import { useState } from "react";

const TabsPage = ({ pokemon }) => {
  const [activeTab, setActiveTab] = useState("types");

  const handleTabClick = (target) => {
    setActiveTab(target);
  };

  return (
    <section className="pokemon-details__tabs tabs">
      <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
      <ActiveTab pokemon={pokemon} activeTab={activeTab} />
    </section>
  );
};

export default TabsPage;
