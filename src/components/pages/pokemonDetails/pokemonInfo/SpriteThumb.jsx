import Button from "../../../universal/Button";

const SpriteThumb = ({ sprite, onThumbClick, isBreakpoint }) => {
  return (
    <Button
      buttonCategory="icon"
      buttonIcon={sprite.url}
      size={isBreakpoint ? "sprite-mobile" : "sprite"}
      clickFunction={() => onThumbClick(sprite)}
    />
  );
};

export default SpriteThumb;
