import PokemonSprite from "./PokemonCard/PokemonSprite";
import BlankSprite from "../pages/teams/BlankSprite";
import BlankCard from "../pages/teamBuilder/BlankCard";
import PokemonCard from "./PokemonCard/PokemonCard";

const TeamPlayers = ({ team = [], page, onTeamChange }) => {
  let content;
  //If the page is teams => this will build a row of 6 pokemon sprites
  if (page === "teams") {
    if (team.length !== 6) {
      content = team.map((pokemon, i) => {
        return (
          <li key={i} className="teams__list-item">
            <PokemonSprite
              pokemonName={pokemon.name}
              source={pokemon.sprite}
              cardType="teams"
            />
          </li>
        );
      });
      const emptySpaces = 6 - team.length;
      for (let i = 0; i < emptySpaces; i++) {
        content.push(
          <li key={i + team.length} className="teams__list-item">
            <BlankSprite />
          </li>,
        );
      }
      return <ul className="teams__team-players">{content}</ul>;
    }
    content = team.map((pokemon, i) => {
      return (
        <li key={i} className="teams__list-item">
          <PokemonSprite
            pokemonName={pokemon.name}
            source={pokemon.sprite}
            cardType="teams"
          />
        </li>
      );
    });
    return <ul className="teams__team-players">{content}</ul>;
  }

  //if page is team-builder => this will render a 3x2 grid of pokemon cards
  if (page === "team-builder") {
    if (team.length !== 6) {
      content = team.map((pokemon, i) => {
        return (
          <li key={i} className="form__list-item">
            <PokemonCard
              pokemon={pokemon}
              cardType="team-builder-form"
              size="medium"
              onTeamChange={onTeamChange}
            />
          </li>
        );
      });
      const emptySpaces = 6 - team.length;
      for (let i = 0; i < emptySpaces; i++) {
        content.push(
          <li key={i + team.length} className="form__list-item">
            <BlankCard />
          </li>,
        );
      }
      return <ul className="form__team">{content}</ul>;
    }
    content = team.map((pokemon, i) => {
      return (
        <li key={i} className="form__list-item">
          <PokemonCard
            pokemon={pokemon}
            cardType="team-builder-form"
            size="medium"
            onTeamChange={onTeamChange}
          />
        </li>
      );
    });
    return <ul className="form__team">{content}</ul>;
  }
};

export default TeamPlayers;
