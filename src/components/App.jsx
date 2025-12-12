import { Route, Routes } from "react-router-dom";

import Navbar from "./layout/Navbar";
import PokedexPage from "./pages/pokedex/PokedexPage";
import TeamsPage from "../components/pages/teams/TeamsPage";
import TeamBuilderPage from "./pages/teamBuilder/TeamBuilderPage";
import PokemonDetailsPage from "./pages/pokemonDetails/PokemonDetailsPage";
import "../blocks/App.css";
import { PokemonProvider } from "./context/PokemonProvider";

function App() {
  return (
    <PokemonProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="teams" element={<TeamsPage />}>
          <Route path="edit/:id" element={<TeamBuilderPage />} />
          <Route path="mew" element={<TeamBuilderPage />} />
        </Route>
        <Route path="pokemon">
          <Route path=":id" element={<PokemonDetailsPage />} />
        </Route>
      </Routes>
    </PokemonProvider>
  );
}

export default App;
