import { useState } from "react";
import Toggle from "./Toggle";
import TypeCard from "./TypeCard";

const CardWrapper = ({ type }) => {
  const [activeCard, setActiveCard] = useState("attack");

  const handleToggle = (target) => {
    setActiveCard(target);
  };

  return (
    <section className="types__card">
      <Toggle toggleFunction={handleToggle} activeCard={activeCard} />
      {activeCard === "attack" && <TypeCard stats={type.attack} />}
      {activeCard === "defense" && <TypeCard stats={type.defense} />}
    </section>
  );
};

export default CardWrapper;
