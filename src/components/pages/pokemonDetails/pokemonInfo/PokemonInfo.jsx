//Container to hold sprite gallery, cry button, flavor text rotator
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../../hooks/useData";
import { playBattleCry } from "../../../../utils/utils";
import Preloader from "../../../universal/Preloader";

import SpriteSectionWrapper from "./SpriteSectionWrapper";
import Button from "../../../universal/Button";
import FlavorText from "./FlavorText";
import "../../../../blocks/PokemonInfo.css";

const PokemonInfo = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = useData();

  if (isLoading || !data) return <Preloader />;

  const pokemon = data.find((item) => {
    return item.id === Number(id);
  });

  const battleCries = pokemon.cries;

  return (
    <section className="pokemon-details__pokemon-info pokemon-info">
      <SpriteSectionWrapper pokemon={pokemon} />
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
      {/* <FlavorText pokemon={pokemon} /> */}
    </section>
  );
};

export default PokemonInfo;
