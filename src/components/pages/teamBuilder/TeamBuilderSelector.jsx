import Searchbar from "../../universal/SearchBar";
import PokedexGrid from "../pokedex/PokedexGrid";
import Button from "../../universal/Button";
import useForm from "../../../hooks/useForm";
import { countOccurrences } from "../../../utils/test";

const TeamBuilderSelector = ({
  data,
  selectedPokemon,
  addToArray,
  removeFromArray,
  clearArray,
}) => {
  const { values, handleChange } = useForm({
    search: "",
  });

  const updatePokemonObjectIfOnTeam = (team, pokemon) => {
    const teamCount = countOccurrences(team);
    if (teamCount[pokemon.name]) {
      return {
        ...pokemon,
        isOnTeam: true,
        count: teamCount[pokemon.name],
      };
    }
    return {
      ...pokemon,
      isOnTeam: false,
      count: 0,
    };
  };

  let pokemon;

  const clearPokemonTeam = () => {
    pokemon = data.map((item) => {
      return { ...item, isOnTeam: false, count: 0 };
    });

    clearArray("players");
  };

  pokemon = data
    .map((item) => {
      return selectedPokemon.length
        ? updatePokemonObjectIfOnTeam(selectedPokemon, item)
        : item;
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(values.search.toLowerCase());
    });

  return (
    <section className="team-builder__selector">
      <Searchbar
        placeholder="Search Pokemon for your team..."
        values={values}
        handleChange={handleChange}
      />
      <header className="team-builder__selector-header">
        <h3 className="team-builder__selector-title">
          {selectedPokemon.length} / 6 Pokemon Selected
        </h3>
        <Button
          buttonCategory="ghost"
          buttonType="button"
          buttonText="Clear"
          clickFunction={clearPokemonTeam}
        />
      </header>
      <PokedexGrid
        pokemon={pokemon}
        addToArray={addToArray}
        removeFromArray={removeFromArray}
        lengthOfTeam={selectedPokemon.length}
        cardType="team-builder"
        size="medium"
      />
    </section>
  );
};

export default TeamBuilderSelector;
