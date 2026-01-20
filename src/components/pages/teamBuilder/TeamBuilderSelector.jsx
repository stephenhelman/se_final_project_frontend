import Searchbar from "../../universal/SearchBar";
import PokedexGrid from "../pokedex/PokedexGrid";
import Button from "../../universal/Button";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import { countOccurrences } from "../../../utils/test";

const TeamBuilderSelector = ({
  data,
  selectedPokemon,
  onTeamChange,
  sortOptions,
  scrollRef,
  saveScrollPosition,
}) => {
  const { values, handleChange, toggleState, handleSelect } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "id-asc",
    favoritesOnly: false,
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

    onTeamChange("clear", { name: "players" });
  };

  pokemon = data.map((item) => {
    return selectedPokemon.length
      ? updatePokemonObjectIfOnTeam(selectedPokemon, item)
      : item;
  });

  const visiblePokemon = useSort(pokemon, values);

  return (
    <section className="team-builder__selector">
      <Searchbar
        placeholder="Search Pokemon for your team..."
        values={values}
        handleChange={handleChange}
        sortOptions={sortOptions}
        handleSelect={handleSelect}
        toggleState={toggleState}
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
        pokemon={visiblePokemon}
        onTeamChange={onTeamChange}
        lengthOfTeam={selectedPokemon.length}
        cardType="team-builder"
        size="medium"
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
      />
    </section>
  );
};

export default TeamBuilderSelector;
