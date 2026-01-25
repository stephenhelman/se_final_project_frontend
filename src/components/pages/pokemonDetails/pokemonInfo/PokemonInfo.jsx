import { useState } from "react";
import { playBattleCry } from "../../../../utils/utils";
import SpriteSectionWrapper from "./SpriteSectionWrapper";
import Button from "../../../universal/Button";
import FlavorText from "./FlavorText";
import "../../../../blocks/PokemonInfo.css";

const PokemonInfo = ({ pokemon, isBreakpoint }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const battleCries = Object.values(pokemon.cries);

  return (
    <section className="pokemon-details__pokemon-info pokemon-info">
      <SpriteSectionWrapper pokemon={pokemon} isBreakpoint={isBreakpoint} />
      <div className="pokemon-info__cry-button-wrapper">
        <Button
          buttonCategory="primary"
          buttonText="Play Battle Cry"
          buttonType="button"
          clickFunction={() =>
            playBattleCry(currentAudio, battleCries, setCurrentAudio)
          }
        />
      </div>
      <FlavorText pokemon={pokemon} />
    </section>
  );
};

export default PokemonInfo;
