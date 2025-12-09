import Navbar from "./layout/Navbar";
import PokedexPage from "./pages/pokedex/PokedexPage";
import TeamsPage from "../components/pages/teams/TeamsPage";
import "../blocks/App.css";

function App() {
  return (
    <>
      <Navbar />
      <TeamsPage />
    </>
  );
}

export default App;
