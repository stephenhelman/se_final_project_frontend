//Main Pokemon Sprite in Gallery section

const HeroSprite = ({ sprite }) => {
  return (
    <img
      src={sprite.url}
      alt={sprite.spriteName}
      className="pokemon-info__hero-sprite"
    />
  );
};

export default HeroSprite;
