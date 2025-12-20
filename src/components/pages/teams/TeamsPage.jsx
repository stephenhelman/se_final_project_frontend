import { useState } from "react";

import { useTeamsContext } from "../../../hooks/useTeamsContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import { teamSortOptions } from "../../../utils/constants";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import TeamRowsContainer from "./TeamRowsContainer";

import "../../../blocks/TeamsPage.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TeamsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const handleModalClose = () => setShowDelete(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    //API Call here
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

  const {
    values,
    handleChange,
    toggleInArray,
    toggleState,
    handleSelect,
    clearArray,
  } = useForm({
    selectedTypes: [],
    searchTerm: "",
    sortBy: "id",
    favoritesOnly: false,
  });

  const { teamList, isLoading } = useTeamsContext();

  const visibleTeams = useSort(teamList, values);

  if (isLoading || !teamList) return <Preloader />;

  return (
    <PageLayout
      mainClass="teams"
      filterFunction={toggleInArray}
      title="Teams"
      page="teams"
      searchPlaceholder="Search Pokemon"
      values={values}
      handleChange={handleChange}
      toggleState={toggleState}
      sortOptions={teamSortOptions}
      handleSelect={handleSelect}
      clearArray={clearArray}
    >
      <TeamRowsContainer
        teams={visibleTeams}
        handleDeleteTeam={handleDeleteTeam}
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
