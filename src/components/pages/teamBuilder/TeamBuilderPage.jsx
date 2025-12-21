import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import useSessionCache from "../../../hooks/useSessionCache";
import useDataContext from "../../../hooks/useDataContext";
import useTeamsContext from "../../../hooks/useTeamsContext";
import useScrollSaver from "../../../hooks/useScrollSaver";
import { matchData } from "../../../utils/utils";
import { pokemonSortOptions } from "../../../utils/constants";

import "../../../blocks/TeamBuilderPage.css";
import ErrorModal from "../../universal/ErrorModal";

const TeamBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { pokemonList, isLoading } = useDataContext();
  const {
    teamList,
    isLoading: isTeamsLoading,
    updateTeam,
    createTeam,
    teamError,
    handleResetTeamError,
  } = useTeamsContext();

  const { get, set, remove } = useSessionCache();
  const DRAFT_KEY = "team-builder:draft";

  const handleCloseErrorModal = () => {
    handleResetTeamError();
  };

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

  const { scrollRef, saveScrollPosition } = useScrollSaver("team-builder");

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
    return () => {
      remove(DRAFT_KEY);
    };
  }, [id, isLoading, isTeamsLoading, teamList, get, set, setValues, remove]);

  useEffect(() => {
    if (!isLoading && !isTeamsLoading) {
      set(DRAFT_KEY, values);
    }
  }, [values, isLoading, isTeamsLoading, set]);

  const handleCancel = () => {
    remove(DRAFT_KEY);
    navigate("/teams");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      const createdTeam = createTeam(values);
      if (!createdTeam.ok) return;
      navigate("/teams");
      return;
    }
    const updatedTeam = updateTeam(id, values);
    if (!updatedTeam.ok) return;
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
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
      />
      {teamError && (
        <ErrorModal
          error={teamError}
          isOpen={teamError !== null}
          onClose={handleCloseErrorModal}
        />
      )}
    </main>
  );
};

export default TeamBuilderPage;
