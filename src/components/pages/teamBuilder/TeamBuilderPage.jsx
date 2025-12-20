import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import useSessionCache from "../../../hooks/useSessionCache";
import { useDataContext } from "../../../hooks/useDataContext";
import { useTeamsContext } from "../../../hooks/useTeamsContext";
import { matchData } from "../../../utils/utils";
import { pokemonSortOptions } from "../../../utils/constants";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { pokemonList, isLoading } = useDataContext();
  const { teamList, isLoading: isTeamsLoading } = useTeamsContext();

  const { get, set } = useSessionCache();
  const DRAFT_KEY = "team-builder:draft";

  const {
    values,
    setValues,
    handleChange,
    addToArray,
    removeFromArrayUsingId,
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

  const handleCancel = () => {
    clearDraft();
    navigate("/teams");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //API Call here
    clearDraft();
    navigate("/teams");
  };

  if (isLoading || !pokemonList.length || isTeamsLoading) return <Preloader />;

  return (
    <main className="team-builder">
      <TeamBuilderForm
        values={values}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        removeFromArrayUsingId={removeFromArrayUsingId}
      />
      <TeamBuilderSelector
        data={pokemonList}
        selectedPokemon={values.players}
        addToArray={addToArray}
        removeFromArrayUsingId={removeFromArrayUsingId}
        clearArray={clearArray}
        sortOptions={pokemonSortOptions}
      />
    </main>
  );
};

export default TeamBuilderPage;
