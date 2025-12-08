import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import PokedexGrid from "./PokedexGrid";

const PokedexPage = () => {
  return (
    <>
      <Sidebar />
      <ContentWrapper
        title="Pokedex"
        page="pokedex"
        searchPlaceholder="Search Pokemon"
      >
        <PokedexGrid />
      </ContentWrapper>
    </>
  );
};

export default PokedexPage;
