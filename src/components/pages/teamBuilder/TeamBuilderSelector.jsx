import Searchbar from "../../universal/SearchBar";
import PokedexGrid from "../pokedex/PokedexGrid";
import Button from "../../universal/Button";
import useForm from "../../../hooks/useForm";

const TeamBuilderSelector = ({ data }) => {
  const { values, handleChange } = useForm({
    search: "",
  });

  const pokemon = data.filter((item) =>
    item.name.toLowerCase().includes(values.search.toLowerCase())
  );
  return (
    <section className="team-builder__selector">
      <Searchbar
        placeholder="Search Pokemon for your team..."
        values={values}
        handleChange={handleChange}
      />
      <header className="team-builder__selector-header">
        <h3 className="team-builder__selector-title">0 / 6 Pokemon Selected</h3>
        <Button buttonCategory="ghost" buttonType="button" buttonText="Clear" />
      </header>
      <PokedexGrid pokemon={pokemon} cardType="team-builder" size="medium" />
    </section>
  );
};

export default TeamBuilderSelector;
