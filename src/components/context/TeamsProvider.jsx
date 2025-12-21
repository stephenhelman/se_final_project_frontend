import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTeamsInfo } from "../../hooks/useTeamsInfo";
import { matchData } from "../../utils/utils";
import { buildTeamTypes } from "../../utils/utils";

const TeamsContext = createContext({});

export const TeamsProvider = () => {
  const [teamList, setTeamList] = useState([]);
  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState(null);
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

  const updateTeam = (id, teamInfo) => {
    setIsTeamLoading(true);
    const canSave = teamInfo?.players.length > 0;
    if (!canSave) {
      setTeamError(
        "Cannot save a team with no Pokemon. Please add pokemon and try again"
      );
      setIsTeamLoading(false);
      return { ok: false, error: teamError };
    }
    const match = matchData(id, teams);
    const newList = teamList.map((item) => {
      return item.id === match.id
        ? { ...item, ...teamInfo, lastUpdated: new Date().toISOString() }
        : item;
    });
    setTeamList(newList);
    setIsTeamLoading(false);
    return { ok: true, data: newList };
  };

  const deleteTeam = (id) => {
    const newList = teamList.filter((item) => {
      return item.id !== id;
    });
    setTeamList(newList);
  };

  const createTeam = (teamInfo) => {
    setIsTeamLoading(true);
    const canSave = teamInfo?.players.length > 0;
    if (!canSave) {
      setTeamError(
        "Cannot save a team with no Pokemon. Please add pokemon and try again"
      );
      setIsTeamLoading(false);
      return;
    }
    const newTeam = {
      ...teamInfo,
      id: teamList.length + 1,
      isFavorite: false,
      lastUpdated: new Date().toISOString(),
      types: buildTeamTypes(teamInfo),
    };
    setTeamList((prev) => [...prev, newTeam]);
    setIsTeamLoading(false);
  };

  const handleResetTeamError = () => {
    setTeamError(null);
  };

  const value = {
    teamList,
    isLoading,
    error,
    teamError,
    isTeamLoading,
    toggleFavorite,
    updateTeam,
    deleteTeam,
    createTeam,
    handleResetTeamError,
  };

  return (
    <TeamsContext.Provider value={value}>
      <Outlet />
    </TeamsContext.Provider>
  );
};
export default TeamsContext;
