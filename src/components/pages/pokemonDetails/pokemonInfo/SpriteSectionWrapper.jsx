import HeroSpriteWrapper from "./HeroSpriteWrapper";
import SpriteGallery from "./SpriteGallery";
import { useState } from "react";
import { buildSpriteGallery, rotateArrayLeft } from "../../../../utils/utils";

const SpriteSectionWrapper = ({ pokemon, isBreakpoint }) => {
  const sprites = buildSpriteGallery(pokemon?.sprites);
  const [heroSprite, setHeroSprite] = useState(sprites.heroSprite);
  const [spriteGallery, setSpriteGallery] = useState(sprites.gallerySprites);

  const resetGallery = (oldHero, oldGallery, action, newSprite) => {
    const copyOfOldGallery = [...oldGallery];
    if (action === "prev") {
      const newHero = copyOfOldGallery.at(-1);
      copyOfOldGallery.pop();
      copyOfOldGallery.unshift(oldHero);
      return {
        hero: newHero,
        gallery: copyOfOldGallery,
      };
    }
    if (action === "next") {
      copyOfOldGallery.push(oldHero);
      const newHero = copyOfOldGallery.shift();
      return {
        hero: newHero,
        gallery: copyOfOldGallery,
      };
    }
    if (action === "thumb") {
      const galleryWithOldHero = [...spriteGallery, oldHero];
      const newSpriteIndex = galleryWithOldHero.findIndex(
        (sprite) => sprite.id === newSprite.id,
      );
      const newArray = rotateArrayLeft(galleryWithOldHero, newSpriteIndex);
      const newHero = newArray.shift();

      return {
        hero: newHero,
        gallery: newArray,
      };
    }
  };

  const handlePrevCLick = () => {
    if (!spriteGallery.length) return;
    const { hero, gallery } = resetGallery(heroSprite, spriteGallery, "prev");
    setHeroSprite(hero);
    setSpriteGallery(gallery);
  };

  const handleNextClick = () => {
    if (!spriteGallery.length) return;
    const { hero, gallery } = resetGallery(heroSprite, spriteGallery, "next");
    setHeroSprite(hero);
    setSpriteGallery(gallery);
  };

  const handleSpriteThumbClick = (sprite) => {
    if (!spriteGallery.length) return;
    const { hero, gallery } = resetGallery(
      heroSprite,
      spriteGallery,
      "thumb",
      sprite,
    );
    setHeroSprite(hero);
    setSpriteGallery(gallery);
  };

  return (
    <div className="pokemon-info__sprite-selection-wrapper">
      <HeroSpriteWrapper
        heroSprite={heroSprite}
        onPrevClick={handlePrevCLick}
        onNextClick={handleNextClick}
        isBreakpoint={isBreakpoint}
      />
      <SpriteGallery
        sprites={spriteGallery}
        onThumbClick={handleSpriteThumbClick}
        isBreakpoint={isBreakpoint}
      />
    </div>
  );
};

export default SpriteSectionWrapper;
