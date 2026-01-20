import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import useAppData from "../../../hooks/useAppData";
import useTeamsContext from "../../../hooks/useTeamsContext";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useGlobalError from "../../../hooks/useGlobalError";
import { matchData } from "../../../utils/utils";
import { pokemonSortOptions } from "../../../utils/constants";

import Validator from "../../../utils/Validator";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const { showError } = useGlobalError();

  const { pokemon, isLoading } = useAppData();
  const {
    teamList,
    isLoading: isTeamsLoading,
    updateTeam,
    createTeam,
  } = useTeamsContext();

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

  const { scrollRef, saveScrollPosition } = useScrollSaver(
    "team-builder-scroll",
  );

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
    }
  }, [id, isLoading, isTeamsLoading, teamList, setValues]);

  const handleCancel = () => {
    navigate("/teams");
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    setFieldErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    handleChange(e);
  };

  const handleArrayChange = (type, options) => {
    setFieldErrors((prev) => {
      return {
        ...prev,
        players: "",
      };
    });
    if (type === "remove") {
      return removeFromArrayUsingId(options);
    }
    if (type === "add") {
      return addToArray(options);
    }
    if (type === "clear") {
      return clearArray(options);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError(null);

    const validator = new Validator(values);

    validator.field("name", "Name").required().minLength(3).maxLength(50);
    validator.field("description", "Description").required().maxLength(200);
    validator.field("players", "Players").required().arrayLength(1, 6);

    const validationErrors = validator.getErrors();
    setFieldErrors(validationErrors);

    if (!validator.isValid()) return;

    try {
      let result;
      if (!id) {
        result = createTeam(values);
      } else {
        result = updateTeam(id, values);
      }

      if (result.ok) {
        navigate("/teams");
        return;
      } else {
        setGeneralError(result.error || "Error saving team");
      }
    } catch (err) {
      showError(err);
    }
  };

  if (isLoading || !pokemon || isTeamsLoading) return <Preloader />;

  return (
    <main className="team-builder">
      <TeamBuilderForm
        values={values}
        handleChange={handleInputChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        onTeamChange={handleArrayChange}
        formErrors={fieldErrors}
        generalError={generalError}
      />
      <TeamBuilderSelector
        data={pokemon}
        selectedPokemon={values.players}
        onTeamChange={handleArrayChange}
        sortOptions={pokemonSortOptions}
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
      />
    </main>
  );
};

export default TeamBuilderPage;
