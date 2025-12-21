import { useNavigate } from "react-router-dom";

import TeamRow from "./TeamRow";

const TeamRowsContainer = ({
  teams,
  handleDeleteTeam,
  scrollRef,
  saveScrollPosition,
}) => {
  const navigate = useNavigate();

  const content = teams.map((team) => {
    const handleEditButton = () => {
      saveScrollPosition();
      navigate(`edit/${team.id}`);
    };
    return (
      <TeamRow
        key={team.id}
        team={team}
        handleDeleteTeam={handleDeleteTeam}
        handleEditButton={handleEditButton}
      />
    );
  });
  return (
    <ul className="teams__wrapper" ref={scrollRef}>
      {content}
    </ul>
  );
};

export default TeamRowsContainer;
