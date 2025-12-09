import Searchbar from "../../universal/SearchBar";
import PokedexGrid from "../pokedex/PokedexGrid";
import { mockPokemon } from "../../../utils/constants";
import Button from "../../universal/Button";

const TeamBuilderSelector = () => {
  return (
    <section className="team-builder__selector">
      <Searchbar placeholder="Search Pokemon for your team..." />
      <header className="team-builder__selector-header">
        <h3 className="team-builder__selector-title">0 / 6 Pokemon Selected</h3>
        <Button buttonCategory="ghost" buttonType="button" buttonText="Clear" />
      </header>
      <PokedexGrid
        pokemon={mockPokemon}
        cardType="team-builder"
        size="medium"
      />
    </section>
  );
};

export default TeamBuilderSelector;
