//Container to hold sprite gallery, cry button, flavor text rotator
import { useState } from "react";

import SpriteSectionWrapper from "./SpriteSectionWrapper";
import Button from "../../../universal/Button";
import FlavorText from "./FlavorText";
import "../../../../blocks/PokemonInfo.css";
import sound1 from "../../../../images/pikachuCurrent.ogg";
import sound2 from "../../../../images/pikachuLegacy.ogg";

const PokemonInfo = ({ pokemon }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const battleCries = [sound1, sound2];
  const playBattleCry = () => {
    // Stop the current audio if it exists and is playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset playback to the beginning
    }
    const randomIndex = Math.floor(Math.random() * battleCries.length);
    const newAudio = new Audio(battleCries[randomIndex]);
    setCurrentAudio(newAudio); // Update the state with the new Audio object
    newAudio.play();
  };
  return (
    <section className="pokemon-details__pokemon-info pokemon-info">
      <SpriteSectionWrapper pokemon={pokemon} />
      <div className="pokemon-info__cry-button-wrapper">
        <Button
          buttonCategory="primary"
          buttonText="Play Battle Cry"
          buttonType="button"
          clickFunction={playBattleCry}
        />
      </div>
      <FlavorText pokemon={pokemon} />
    </section>
  );
};

export default PokemonInfo;
