import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useTeamsInfo } from "../../hooks/useTeamsInfo";

const TeamsContext = createContext({});

export const TeamsProvider = () => {
  const { teams, isLoading, error } = useTeamsInfo();

  const value = {
    teams,
    isLoading,
    error,
  };

  return (
    <TeamsContext.Provider value={value}>
      <Outlet />
    </TeamsContext.Provider>
  );
};
export default TeamsContext;
