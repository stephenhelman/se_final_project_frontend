import { useTeamsContext } from "../../../hooks/useTeamsContext";
import useForm from "../../../hooks/useForm";
import useSort from "../../../hooks/useSort";
import { teamSortOptions } from "../../../utils/constants";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import TeamRowsContainer from "./TeamRowsContainer";

import "../../../blocks/TeamsPage.css";

const TeamsPage = () => {
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
      <TeamRowsContainer teams={visibleTeams} />
    </PageLayout>
  );
};

export default TeamsPage;
