import { Route, Routes } from "react-router-dom";

import Navbar from "./layout/Navbar";
import PokedexPage from "./pages/pokedex/PokedexPage";
import TeamsPage from "../components/pages/teams/TeamsPage";
import TeamBuilderPage from "./pages/teamBuilder/TeamBuilderPage";
import PokemonDetailsPage from "./pages/pokemonDetails/PokemonDetailsPage";
import "../blocks/App.css";
import { PokemonProvider } from "./context/PokemonProvider";
import { TypesProvider } from "./context/TypesProvider";
import { TeamsProvider } from "./context/TeamsProvider";

function App() {
  return (
    <PokemonProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route element={<TeamsProvider />}>
          <Route path="teams">
            <Route index element={<TeamsPage />} />
            <Route path="edit/:id" element={<TeamBuilderPage />} />
            <Route path="new" element={<TeamBuilderPage />} />
          </Route>
        </Route>
        <Route element={<TypesProvider />}>
          <Route path="pokemon">
            <Route path=":id" element={<PokemonDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </PokemonProvider>
  );
}

export default App;
