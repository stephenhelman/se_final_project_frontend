import { useContext } from "react";
import TeamsContext from "../components/context/TeamsProvider";

const useTeamsContext = () => {
  return useContext(TeamsContext);
};

export default useTeamsContext;
