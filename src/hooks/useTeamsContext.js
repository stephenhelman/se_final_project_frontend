import { useContext } from "react";
import TeamsContext from "../components/context/TeamsProvider";

export const useTeamsContext = () => {
  return useContext(TeamsContext);
};
