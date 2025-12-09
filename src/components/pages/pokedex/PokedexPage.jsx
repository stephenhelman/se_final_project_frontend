import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import PokedexGrid from "./PokedexGrid";
import { mockPokemon } from "../../../utils/constants";

import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  return (
    <main className="pokedex">
      <Sidebar />
      <ContentWrapper
        title="Pokédex"
        page="pokedex"
        searchPlaceholder="Search Pokemon"
      >
        <PokedexGrid cardType="pokedex" size="large" pokemon={mockPokemon} />
      </ContentWrapper>
    </main>
  );
};

export default PokedexPage;
