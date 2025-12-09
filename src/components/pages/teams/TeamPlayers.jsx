import PokemonSprite from "../../universal/PokemonCard/PokemonSprite";
import BlankSprite from "./BlankSprite";
import { mockPokemon } from "../../../utils/constants";
import { getTeamSprites } from "../../../utils/utils";

const TeamPlayers = ({ players }) => {
  let content;
  if (players.length !== 6) {
    const teamPlayers = players.map((pokemon) => {
      const sprite = getTeamSprites(pokemon, mockPokemon);
      return (
        <li key={pokemon.name} className="teams__list-item">
          <PokemonSprite
            pokemonName={pokemon.name}
            source={sprite}
            cardType="teams"
          />
        </li>
      );
    });
    const emptySpaces = 6 - players.length;
    for (let i = 0; i < emptySpaces; i++) {
      teamPlayers.push(
        <li key={i} className="teams__list-item">
          <BlankSprite />
        </li>
      );
    }
    return <ul className="teams__team-players">{teamPlayers}</ul>;
  }
  content = players.map((pokemon) => {
    const sprite = getTeamSprites(pokemon, mockPokemon);
    return (
      <li key={pokemon.name} className="teams__list-item">
        <PokemonSprite
          pokemonName={pokemon.name}
          source={sprite}
          cardType="teams"
        />
      </li>
    );
  });
  return <ul className="teams__team-players">{content}</ul>;
};

export default TeamPlayers;
