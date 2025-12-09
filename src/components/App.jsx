import Navbar from "./layout/Navbar";
import PokedexPage from "./pages/pokedex/PokedexPage";
import TeamsPage from "../components/pages/teams/TeamsPage";
import TeamBuilderPage from "./pages/teamBuilder/TeamBuilderPage";
import "../blocks/App.css";

function App() {
  return (
    <>
      <Navbar />
      {/* <PokedexPage /> */}
      {/* <TeamsPage /> */}
      <TeamBuilderPage />
    </>
  );
}

export default App;
