import { useState } from "react";

import { useTeamsContext } from "../../../hooks/useTeamsContext";
import useForm from "../../../hooks/useForm";

import PageLayout from "../../layout/Layout";
import Preloader from "../../universal/Preloader";
import TeamRowsContainer from "./TeamRowsContainer";

import "../../../blocks/TeamsPage.css";

const TeamsPage = () => {
  const [filterTypes, setFilterTypes] = useState([]);
  const { values, handleChange } = useForm({
    search: "",
  });

  const handleFilterTypes = (filter) => {
    if (filterTypes.includes(filter)) {
      return setFilterTypes((prev) =>
        prev.filter((type) => {
          return type.toLowerCase() !== filter.toLowerCase();
        })
      );
    }

    setFilterTypes((prev) => [...prev, filter]);
  };

  const { teamList, isLoading } = useTeamsContext();

  if (isLoading || !teamList) return <Preloader />;

  const filteredTeams = teamList.filter((team) =>
    team.name.toLowerCase().includes(values.search.toLowerCase())
  );

  return (
    <PageLayout
      mainClass="teams"
      filterFunction={handleFilterTypes}
      title="Teams"
      page="teams"
      searchPlaceholder="Search Pokemon"
      values={values}
      handleChange={handleChange}
    >
      <TeamRowsContainer teams={filteredTeams} />
    </PageLayout>
  );
};

export default TeamsPage;
