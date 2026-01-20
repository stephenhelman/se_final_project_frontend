import { useContext } from "react";
import TeamsContext from "../context/TeamsProvider";

const useTeamsContext = () => {
  return useContext(TeamsContext);
};

export default useTeamsContext;
