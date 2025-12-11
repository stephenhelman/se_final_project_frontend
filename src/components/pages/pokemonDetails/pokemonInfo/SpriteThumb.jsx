//Sprite thumbnails inside of SPriteGallery

const SpriteThumb = ({ sprite, onThumbClick }) => {
  return (
    <button
      className="pokemon-info__sprite-button"
      onClick={() => onThumbClick(sprite)}
    >
      <img
        src={sprite.url}
        alt={sprite.spriteName}
        className="pokemon-info__gallery-sprite"
      />
    </button>
  );
};

export default SpriteThumb;
