import { useState } from "react";

import useTeamsContext from "../../../hooks/useTeamsContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import useScrollSaver from "../../../hooks/useScrollSaver";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { teamSortOptions } from "../../../utils/constants";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import TeamRowsContainer from "./TeamRowsContainer";
import Button from "../../universal/Button";
import SortMenu from "../../universal/SortMenu";

import "../../../blocks/TeamsPage.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TeamsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleModalClose = () => setShowDelete(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteTeam(teamToDelete.id);
    setTeamToDelete(null);
    handleModalClose();
  };

  const handleCancel = () => {
    setTeamToDelete(null);
    handleModalClose();
  };

  const handleDeleteTeam = (team) => {
    setTeamToDelete(team);
    setShowDelete(true);
  };

  const handleShowFilterMenuClicked = () => {
    setShowFilterMenu((prev) => !prev);
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
      buttonCategory="icon"
      buttonIcon="filterIcon"
      size="lg"
      clickFunction={handleShowFilterMenuClicked}
    />
  );

  let buttons;
  if (isMobile || isTablet) {
    buttons = [mobileFilterButton];
  } else {
    buttons = [sortButton, favoritesButton];
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
    >
      <TeamRowsContainer
        teams={visibleTeams}
        handleDeleteTeam={handleDeleteTeam}
        scrollRef={scrollRef}
        saveScrollPosition={saveScrollPosition}
        toggleFavorite={toggleFavorite}
      />
      {showDelete && (
        <ConfirmDeleteModal
          team={teamToDelete}
          isOpen={showDelete}
          onClose={handleModalClose}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
    </PageLayout>
  );
};

export default TeamsPage;
