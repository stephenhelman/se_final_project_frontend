import { useState, useEffect } from "react";

const FlavorText = ({ pokemon }) => {
  const [flavorTextIndex, setFlavorTextIndex] = useState(0);
  const flavorTexts = pokemon.flavorText;

  useEffect(() => {
    if (!flavorTexts || flavorTexts.length === 0) return;

    const interval = setInterval(() => {
      setFlavorTextIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < flavorTexts.length ? nextIndex : 0;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [flavorTexts]);

  useEffect(() => {
    setFlavorTextIndex(0);
  }, [pokemon.id]);

  return (
    <div className="pokemon-info__flavor-text">
      <p className="pokemon-info__flavor-text-title">Pokédex Entry</p>
      <p className="pokemon-info__flavor-text-content">
        {flavorTexts[flavorTextIndex]}
      </p>
      <p className="pokemon-info__flavor-text-counter">
        Entry {flavorTextIndex + 1} of {flavorTexts.length}
      </p>
    </div>
  );
};

export default FlavorText;
