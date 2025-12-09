import TeamRow from "./TeamRow";
import { mockTeams } from "../../../utils/constants";

const TeamRowsContainer = () => {
  const content = mockTeams.map((team) => {
    return <TeamRow key={team.id} team={team} />;
  });
  return <ul className="teams__wrapper">{content}</ul>;
};

export default TeamRowsContainer;
