//Container to hold sprite gallery, cry button, flavor text rotator
import SpriteSectionWrapper from "./SpriteSectionWrapper";
import Button from "../../../universal/Button";
import FlavorText from "./FlavorText";
import "../../../../blocks/PokemonInfo.css";

const PokemonInfo = ({ pokemon }) => {
  return (
    <section className="pokemon-details__pokemon-info pokemon-info">
      <SpriteSectionWrapper pokemon={pokemon} />
      <div className="pokemon-info__cry-button-wrapper">
        <Button
          buttonCategory="primary"
          buttonText="Play Battle Cry"
          buttonType="button"
        />
      </div>
      <FlavorText pokemon={pokemon} />
    </section>
  );
};

export default PokemonInfo;
