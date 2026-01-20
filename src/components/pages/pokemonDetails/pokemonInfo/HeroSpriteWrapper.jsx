import { parseGenderAndShiny } from "../../../../utils/utils";
import HeroSprite from "./HeroSprite";
import icons from "../../../../utils/imageUtils";

const HeroSpriteWrapper = ({ heroSprite, onPrevClick, onNextClick }) => {
  const spriteDescription = parseGenderAndShiny(heroSprite.spriteName);

  return (
    <div className="pokemon-info__hero-sprite-wrapper">
      <div className="pokemon-info__sprite-nav-wrapper">
        <button
          className="pokemon-info__sprite-nav-button"
          onClick={onPrevClick}
        >
          <img
            src={icons.prevIcon}
            alt="previous sprite"
            className="pokemon-info__sprite-nav"
          />
        </button>
        <HeroSprite sprite={heroSprite} />
        <button
          className="pokemon-info__sprite-nav-button"
          onClick={onNextClick}
        >
          <img
            src={icons.nextIcon}
            alt="previous sprite"
            className="pokemon-info__sprite-nav"
          />
        </button>
      </div>
      <div className="pokemon-info__hero-sprite-description">
        <p className="pokemon-info__hero-sprite-text">{spriteDescription[0]}</p>
        <p className="pokemon-info__hero-sprite-text">{spriteDescription[1]}</p>
      </div>
    </div>
  );
};

export default HeroSpriteWrapper;
