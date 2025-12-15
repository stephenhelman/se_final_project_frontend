import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTeamsInfo } from "../../hooks/useTeamsInfo";
import { matchData } from "../../utils/utils";

const TeamsContext = createContext({});

export const TeamsProvider = () => {
  const [teamList, setTeamList] = useState([]);
  const { teams, isLoading, error } = useTeamsInfo();

  useEffect(() => {
    if (isLoading || !teams || !teams.length) return;
    setTeamList(teams);
  }, [isLoading, teams]);

  const toggleFavorite = (id, value) => {
    const match = matchData(id, teams);
    //replace match in array
    const newList = teamList.map((item) => {
      return item.id === match.id ? { ...item, isFavorite: value } : item;
    });
    //api to update team
    //set new state
    setTeamList(newList);
  };

  const value = {
    teamList,
    isLoading,
    error,
    toggleFavorite,
  };

  return (
    <TeamsContext.Provider value={value}>
      <Outlet />
    </TeamsContext.Provider>
  );
};
export default TeamsContext;
