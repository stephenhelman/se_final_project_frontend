import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useTeamsContext from "../../../hooks/useTeamsContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useWindowWidth from "../../../hooks/useWindowWidth";
import InfoModal from "../../universal/InfoModal";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import TeamRowsContainer from "./TeamRowsContainer";
import Button from "../../universal/Button";
import SortMenu from "../../universal/SortMenu";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

import { teamSortOptions } from "../../../utils/constants";
import "../../../blocks/TeamsPage.css";

const TeamsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [teamFlavor, setTeamFlavor] = useState("");
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  const handleDeleteClose = () => setShowDelete(false);
  const handleShowInfo = (e, flavorText) => {
    setCoordinates({ x: e.pageX, y: e.pageY });
    setTeamFlavor(flavorText);
    setShowInfo(true);
  };
  const handleHideInfo = () => {
    setTeamFlavor("");
    setShowInfo(false);
  };

  const navigate = useNavigate();

  const {
    values,
    handleChange,
    toggleInArray,
    toggleState,
    handleSelect,
    clearArray,
    handleReset,
  } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "updated-dec",
    favoritesOnly: false,
  });

  const { teamList, isLoading, deleteTeam, toggleFavorite } = useTeamsContext();
  const { scrollRef, saveScrollPosition } = useScrollSaver("teams-scroll");
  const { isMobile, isTablet } = useWindowWidth();
  const isBreakpoint = useMemo(() => {
    return Boolean(isMobile || isTablet);
  }, [isMobile, isTablet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteTeam(teamToDelete.id);
    setTeamToDelete(null);
    handleDeleteClose();
  };

  const handleCancel = () => {
    setTeamToDelete(null);
    handleDeleteClose();
  };

  const handleDeleteTeam = (team) => {
    setTeamToDelete(team);
    setShowDelete(true);
  };

  const handleShowFilterMenuClicked = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleCloseFilterMenu = () => {
    setShowFilterMenu(false);
  };

  const visibleTeams = useSort(teamList, values);

  if (isLoading || !teamList) return <Preloader />;

  const favoritesButton = (
    <Button
      key="favorites"
      buttonCategory={values.favoritesOnly ? "primary" : "ghost"}
      buttonText="Favorites"
      buttonType="button"
      clickFunction={() => toggleState("favoritesOnly")}
      isActive={values.favoritesOnly}
    />
  );

  const sortButton = (
    <SortMenu
      key="sort-menu"
      sortOptions={teamSortOptions}
      handleSelect={handleSelect}
      values={values}
    />
  );

  const mobileFilterButton = (
    <Button
      key="filter"
      buttonCategory="icon"
      buttonIcon="filterIcon"
      size="lg"
      clickFunction={handleShowFilterMenuClicked}
    />
  );

  const newTeamButton = (
    <Button
      key="new"
      buttonCategory="icon"
      buttonIcon="addIcon"
      size="lg"
      clickFunction={() => navigate("/teams/new")}
    />
  );

  let buttons;
  if (isMobile || isTablet) {
    buttons = [mobileFilterButton, newTeamButton];
  } else {
    buttons = [sortButton, favoritesButton, newTeamButton];
  }

  return (
    <PageLayout
      mainClass="teams"
      filterFunction={toggleInArray}
      title="Teams"
      page="teams"
      searchPlaceholder="Search Pokemon"
      values={values}
      handleChange={handleChange}
      handleSelect={handleSelect}
      clearArray={clearArray}
      buttons={buttons}
      showFilterMenu={showFilterMenu}
      toggleState={toggleState}
      handleReset={handleReset}
      sortOptions={teamSortOptions}
      onFilterClose={handleCloseFilterMenu}
    >
      <TeamRowsContainer
        teams={visibleTeams}
        handleDeleteTeam={handleDeleteTeam}
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
        toggleFavorite={toggleFavorite}
        showInfo={handleShowInfo}
        isBreakpoint={isBreakpoint}
      />
      {showInfo && (
        <InfoModal
          text={teamFlavor}
          isOpen={showInfo}
          onClose={handleHideInfo}
          isBreakpoint={isBreakpoint}
          coordinates={coordinates}
        />
      )}
      {showDelete && (
        <ConfirmDeleteModal
          team={teamToDelete}
          isOpen={showDelete}
          onClose={handleDeleteClose}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
    </PageLayout>
  );
};

export default TeamsPage;
