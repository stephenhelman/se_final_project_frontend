import PokemonSprite from "../../universal/PokemonCard/PokemonSprite";

const TeamPlayers = (players) => {
  const content = players.map((pokemon) => {
    return (
      <PokemonSprite
        key={pokemon.id}
        pokemonName={pokemon.name}
        source="source"
        cardType="team"
      />
    );
  });
  return <ul>{content}</ul>;
};

export default TeamPlayers;
