import { parseGenderAndShiny } from "../../../../utils/utils";
import HeroSprite from "./HeroSprite";
import Button from "../../../universal/Button";

const HeroSpriteWrapper = ({
  heroSprite,
  onPrevClick,
  onNextClick,
  isBreakpoint,
}) => {
  const spriteDescription = parseGenderAndShiny(heroSprite.spriteName);

  return (
    <div className="pokemon-info__hero-sprite-wrapper">
      <div className="pokemon-info__sprite-nav-wrapper">
        <Button
          buttonCategory="icon"
          size={isBreakpoint ? "md" : "sm"}
          clickFunction={onPrevClick}
          buttonIcon="prevIcon"
        />
        <HeroSprite sprite={heroSprite} />
        <Button
          buttonCategory="icon"
          size={isBreakpoint ? "md" : "sm"}
          clickFunction={onNextClick}
          buttonIcon="nextIcon"
        />
      </div>
      <div className="pokemon-info__hero-sprite-description">
        <p className="pokemon-info__hero-sprite-text">{spriteDescription[0]}</p>
        <p className="pokemon-info__hero-sprite-text">{spriteDescription[1]}</p>
      </div>
    </div>
  );
};

export default HeroSpriteWrapper;
