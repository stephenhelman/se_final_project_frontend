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
    return pokemon;
  };

  const pokemon = data
    .map((item) => {
      return selectedPokemon.length
        ? updatePokemonObjectIfOnTeam(selectedPokemon, item)
        : item;
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(values.search.toLowerCase());
    });

  console.log(selectedPokemon);

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
        <Button buttonCategory="ghost" buttonType="button" buttonText="Clear" />
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
