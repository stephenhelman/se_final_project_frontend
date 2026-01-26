import { useNavigate } from "react-router-dom";

import TeamRow from "./TeamRow";

const TeamRowsContainer = ({
  teams,
  handleDeleteTeam,
  scrollRef,
  saveScrollPosition,
  toggleFavorite,
  showInfo,
  isBreakpoint,
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
        toggleFavorite={toggleFavorite}
        showInfo={showInfo}
        isBreakpoint={isBreakpoint}
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
