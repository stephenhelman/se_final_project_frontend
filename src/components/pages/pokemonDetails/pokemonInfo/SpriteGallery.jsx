//gallery of smaller SpriteTHumbs
import SpriteThumb from "./SpriteThumb";

const SpriteGallery = ({ sprites }) => {
  const content = sprites.map((sprite) => {
    return (
      <li key={sprite.id} className="pokemon-info__list-item">
        <SpriteThumb sprite={sprite} />
      </li>
    );
  });
  return <ul className="pokemon-info__sprite-gallery">{content}</ul>;
};

export default SpriteGallery;
