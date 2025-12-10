import Navbar from "./layout/Navbar";
import PokedexPage from "./pages/pokedex/PokedexPage";
import TeamsPage from "../components/pages/teams/TeamsPage";
import TeamBuilderPage from "./pages/teamBuilder/TeamBuilderPage";
import "../blocks/App.css";
import PokemonDetailsPage from "./pages/pokemonDetails/PokemonDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      {/* <PokedexPage /> */}
      {/* <TeamsPage /> */}
      {/* <TeamBuilderPage /> */}
      <PokemonDetailsPage />
    </>
  );
}

export default App;
