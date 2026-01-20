import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import useTeamsData from "../hooks/useTeamsData";
import useAppData from "../hooks/useAppData";

const TeamsContext = createContext({});

export const TeamsProvider = () => {
  const { pokemon } = useAppData();
  const {
    teams,
    isLoading,
    error,
    createTeam,
    updateTeam,
    deleteTeam,
    toggleFavorite,
  } = useTeamsData(pokemon);

  const [teamError, setTeamError] = useState(null);

  const handleCreateTeam = async (teamData) => {
    const result = await createTeam(teamData);
    if (!result.ok) {
      setTeamError(result.error);
    }
    return result;
  };

  const handleUpdateTeam = async (teamId, teamData) => {
    const result = await updateTeam(teamId, teamData);
    if (!result.ok) {
      setTeamError(result.error);
    }
    return result;
  };

  const handleDeleteTeam = async (teamId) => {
    const result = await deleteTeam(teamId);
    if (!result.ok) {
      setTeamError(result.error);
    }
    return result;
  };

  const handleResetTeamError = () => {
    setTeamError(null);
  };

  const value = {
    // Data
    teamList: teams,
    isLoading,
    error,
    teamError,
    isTeamLoading: isLoading, // Alias for compatibility

    // Methods
    createTeam: handleCreateTeam,
    updateTeam: handleUpdateTeam,
    deleteTeam: handleDeleteTeam,
    toggleFavorite,
    handleResetTeamError,
  };

  return (
    <TeamsContext.Provider value={value}>
      <Outlet />
    </TeamsContext.Provider>
  );
};

export default TeamsContext;
