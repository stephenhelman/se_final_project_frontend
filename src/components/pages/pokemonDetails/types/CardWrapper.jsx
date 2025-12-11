import { useState } from "react";

import Toggle from "./Toggle";
import TypeCard from "./TypeCard";

const CardWrapper = ({ type }) => {
  const [activeCard, setActiveCard] = useState("attack");
  //api call to find out type stats
  const attackStats = [
    {
      name: "Double Damage",
      types: ["flying", "water"],
    },
    {
      name: "Half Damage",
      types: ["grass", "electric", "dragon"],
    },
    {
      name: "No Damage",
      types: ["ground"],
    },
  ];
  const defenseStats = [
    {
      name: "Double Damage From",
      types: ["ground"],
    },
    {
      name: "Half Damage From",
      types: ["flying", "steel", "electric"],
    },
    {
      name: "Immune",
      types: [],
    },
  ];

  const handleToggle = (target) => {
    setActiveCard(target);
  };

  return (
    <section className="types-tab__card">
      <Toggle toggleFunction={handleToggle} activeCard={activeCard} />
      {activeCard === "attack" && <TypeCard stats={attackStats} />}
      {activeCard === "defense" && <TypeCard stats={defenseStats} />}
    </section>
  );
};

export default CardWrapper;
