import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";
import Sidebar from "../../layout/Sidebar";
import Button from "../../universal/Button";
import ButtonRow from "../../universal/ButtonRow";

import useForm from "../../../hooks/useForm";
import useAppData from "../../../hooks/useAppData";
import useTeamsContext from "../../../hooks/useTeamsContext";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useGlobalError from "../../../hooks/useGlobalError";
import useWindowWidth from "../../../hooks/useWindowWidth";

import { matchData, updatePokemonObjectIfOnTeam } from "../../../utils/utils";
import { pokemonSortOptions } from "../../../utils/constants";

import Validator from "../../../utils/Validator";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activePanel, setActivePanel] = useState("team-form");
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const { showError } = useGlobalError();

  const { isMobile, isTablet } = useWindowWidth();

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

  const {
    values: filterValues,
    handleChange: handleFilterChange,
    toggleState: toggleFilterState,
    handleSelect: handleFilterSelect,
    toggleInArray,
    clearArray: clearFilterArray,
    handleReset,
  } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "id-asc",
    favoritesOnly: false,
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
        players: match?.players.map((pokemon) => {
          return updatePokemonObjectIfOnTeam(match?.players, pokemon);
        }),
      };
      setValues(teamData);
    }
  }, [id, isLoading, isTeamsLoading, teamList, setValues]);

  const handleShowFilterMenuClicked = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleCloseFilterMenu = () => {
    setShowFilterMenu(false);
  };

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

  const data = pokemon.map((element) => {
    return values.players.length
      ? updatePokemonObjectIfOnTeam(values.players, element)
      : element;
  });

  const filterButton = (
    <Button
      key="filter"
      buttonCategory="icon"
      buttonIcon="filterIcon"
      size="lg"
      clickFunction={handleShowFilterMenuClicked}
    />
  );

  const formButton = (
    <Button
      key="form"
      buttonCategory="nav-tab-left"
      buttonText="Builder"
      buttonType="button"
      clickFunction={() => setActivePanel("team-form")}
    />
  );

  const selectorButton = (
    <Button
      key="selector"
      buttonCategory="nav-tab-right"
      buttonText="Selector"
      buttonType="button"
      clickFunction={() => setActivePanel("team-selector")}
    />
  );

  return (
    <>
      <main className="team-builder">
        <Sidebar
          filterFunction={toggleInArray}
          clearArray={clearFilterArray}
          values={filterValues}
          showFilterMenu={showFilterMenu}
          handleSelect={handleFilterSelect}
          toggleState={toggleFilterState}
          handleReset={handleReset}
          page="team-builder"
          sortOptions={pokemonSortOptions}
          onClose={handleCloseFilterMenu}
        />

        <TeamBuilderForm
          values={values}
          handleChange={handleInputChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          onTeamChange={handleArrayChange}
          formErrors={fieldErrors}
          generalError={generalError}
          isMobile={isMobile}
          isTablet={isTablet}
          activePanel={activePanel}
          setActivePanel={() => setActivePanel("team-selector")}
        />
        {(isMobile || isTablet) && (
          <ButtonRow
            buttons={selectorButton}
            direction="right"
            isBreakpoint={true}
            isVisible={Boolean(activePanel === "team-form")}
          />
        )}

        <TeamBuilderSelector
          data={data}
          selectedPokemon={values.players}
          onTeamChange={handleArrayChange}
          sortOptions={pokemonSortOptions}
          scrollRef={scrollRef}
          saveScrollPosition={saveScrollPosition}
          buttons={[filterButton]}
          values={filterValues}
          handleChange={handleFilterChange}
          isMobile={isMobile}
          isTablet={isTablet}
          activePanel={activePanel}
          setActivePanel={() => setActivePanel("team-form")}
        />
        {(isMobile || isTablet) && (
          <ButtonRow
            buttons={formButton}
            direction="left"
            isBreakpoint={true}
            isVisible={Boolean(activePanel === "team-selector")}
          />
        )}
      </main>
    </>
  );
};

export default TeamBuilderPage;
