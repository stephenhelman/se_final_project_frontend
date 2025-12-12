import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import Preloader from "../../universal/Preloader";
import PokedexGrid from "./PokedexGrid";
import { useData } from "../../../hooks/useData";

import "../../../blocks/Pokedex.css";

const PokedexPage = () => {
  const { data, isLoading } = useData();

  if (isLoading || !data) return <Preloader />;

  return (
    <main className="pokedex">
      <Sidebar />
      <ContentWrapper
        title="Pokédex"
        page="pokedex"
        searchPlaceholder="Search Pokemon"
      >
        <PokedexGrid cardType="pokedex" size="large" pokemon={data} />
      </ContentWrapper>
    </main>
  );
};

export default PokedexPage;
