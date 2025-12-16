import { useEffect } from "react";
import { useParams } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import useSessionCache from "../../../hooks/useSessionCache";
import { useDataContext } from "../../../hooks/useDataContext";
import { useTeamsContext } from "../../../hooks/useTeamsContext";
import { matchData } from "../../../utils/utils";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { id } = useParams();

  const { pokemonList, isLoading } = useDataContext();
  const { teamList, isLoading: isTeamsLoading } = useTeamsContext();

  const { get, set } = useSessionCache();
  const DRAFT_KEY = "team-builder:draft";

  const {
    values,
    setValues,
    handleChange,
    addToArray,
    removeFromArray,
    clearArray,
  } = useForm({
    name: "",
    description: "",
    players: [],
  });

  useEffect(() => {
    if (isLoading || isTeamsLoading) return;
    if (id) {
      const match = matchData(id, teamList);
      const teamData = {
        name: match?.name || "",
        description: match?.description || "",
        players: match?.players || [],
      };
      setValues(teamData);
      set(DRAFT_KEY, teamData);
    } else {
      const draft = get(DRAFT_KEY);
      if (draft) {
        setValues({
          name: draft.name || "",
          description: draft.description || "",
          players: draft.players || [],
        });
      }
    }
  }, [id, isLoading, isTeamsLoading, teamList, get, set, setValues]);

  useEffect(() => {
    if (!isLoading && !isTeamsLoading) {
      set(DRAFT_KEY, values);
    }
  }, [values, isLoading, isTeamsLoading, set]);

  const clearDraft = () => {
    set(DRAFT_KEY, null);
  };

  if (isLoading || !pokemonList.length || isTeamsLoading) return <Preloader />;

  return (
    <main className="team-builder">
      <TeamBuilderForm
        values={values}
        handleChange={handleChange}
        clearDraft={clearDraft}
      />
      <TeamBuilderSelector
        data={pokemonList}
        selectedPokemon={values.players}
        addToArray={addToArray}
        removeFromArray={removeFromArray}
        clearArray={clearArray}
      />
    </main>
  );
};

export default TeamBuilderPage;
