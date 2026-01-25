//gallery of smaller SpriteTHumbs
import SpriteThumb from "./SpriteThumb";

const SpriteGallery = ({ sprites, onThumbClick, isBreakpoint }) => {
  const content = sprites.map((sprite) => {
    return (
      <li key={sprite.id} className="pokemon-info__list-item">
        <SpriteThumb
          sprite={sprite}
          onThumbClick={onThumbClick}
          isBreakpoint={isBreakpoint}
        />
      </li>
    );
  });
  return <ul className="pokemon-info__sprite-gallery">{content}</ul>;
};

export default SpriteGallery;
