import HeroSpriteWrapper from "./HeroSpriteWrapper";
import SpriteGallery from "./SpriteGallery";
import { useState, useEffect } from "react";
import { buildSpriteGallery } from "../../../../utils/utils";

const SpriteSectionWrapper = ({ pokemon }) => {
  const [spritesState, setSpritesState] = useState(() =>
    buildSpriteGallery(pokemon?.sprites)
  );

  useEffect(() => {
    setSpritesState(buildSpriteGallery(pokemon?.sprites));
  }, [pokemon?.id]);

  return (
    <div className="pokemon-info__sprite-selection-wrapper">
      <HeroSpriteWrapper heroSprite={spritesState.heroSprite} />
      <SpriteGallery sprites={spritesState.gallerySprites} />
    </div>
  );
};

export default SpriteSectionWrapper;
