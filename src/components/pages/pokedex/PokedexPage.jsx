import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import PokedexGrid from "./PokedexGrid";

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
        <PokedexGrid />
      </ContentWrapper>
    </main>
  );
};

export default PokedexPage;
