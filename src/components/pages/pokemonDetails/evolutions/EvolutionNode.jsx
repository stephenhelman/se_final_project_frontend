import PokemonCard from "../../../universal/PokemonCard/PokemonCard";

const EvolutionNode = ({ pokemon, isSelected, onSelect, position, sizes }) => {
  if (!pokemon) return;
  const handleClick = () => {
    if (onSelect) {
      onSelect(pokemon);
    }
  };
  const classes = [
    "evolution__node",
    isSelected ? "evolution__node_type_selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = position
    ? {
        position: "absolute",
        left: position.x,
        top: position.y,
        height: sizes.NODE_HEIGHT,
        width: sizes.NODE_WIDTH,
      }
    : undefined;

  return (
    <div
      className={classes}
      style={style}
      onClick={handleClick}
      role="button"
      data-evo-node
    >
      <PokemonCard
        pokemon={pokemon}
        page="evolutions"
        isSelected={isSelected}
      />
    </div>
  );
};

export default EvolutionNode;
