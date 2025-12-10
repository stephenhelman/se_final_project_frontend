//Sprite thumbnails inside of SPriteGallery

const SpriteThumb = ({ sprite }) => {
  return (
    <button className="pokemon-info__sprite-button">
      <img
        src={sprite.url}
        alt={sprite.spriteName}
        className="pokemon-info__gallery-sprite"
      />
    </button>
  );
};

export default SpriteThumb;
