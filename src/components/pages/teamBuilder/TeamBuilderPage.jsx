import { useEffect } from "react";
import { useParams } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import { useDataContext } from "../../../hooks/useDataContext";
import { useTeamsContext } from "../../../hooks/useTeamsContext";
import { matchData } from "../../../utils/utils";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { id } = useParams();

  const { pokemonList, isLoading } = useDataContext();
  const { teamList, isLoading: isTeamsLoading } = useTeamsContext();

  const { values, setValues, handleChange, addToArray, removeFromArray } =
    useForm({
      name: "",
      description: "",
      players: [],
    });

  useEffect(() => {
    if (isLoading || isTeamsLoading) return;
    if (id) {
      const match = matchData(id, teamList);
      setValues({
        name: match?.name,
        description: match?.description,
        players: match?.players,
      });
    }
  }, [id, setValues, isLoading, isTeamsLoading, teamList]);

  if (isLoading || !pokemonList.length || isTeamsLoading) return <Preloader />;

  return (
    <main className="team-builder">
      <TeamBuilderForm values={values} handleChange={handleChange} />
      <TeamBuilderSelector
        data={pokemonList}
        selectedPokemon={values.players}
        addToArray={addToArray}
        removeFromArray={removeFromArray}
      />
    </main>
  );
};

export default TeamBuilderPage;
