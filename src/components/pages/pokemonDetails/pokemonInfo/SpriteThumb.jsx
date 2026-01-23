import Button from "../../../universal/Button";

const SpriteThumb = ({ sprite, onThumbClick }) => {
  return (
    <Button
      buttonCategory="icon"
      buttonIcon={sprite.url}
      size="sprite"
      clickFunction={() => onThumbClick(sprite)}
    />
  );
};

export default SpriteThumb;
