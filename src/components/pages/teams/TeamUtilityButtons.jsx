import { useState } from "react";

import Button from "../../universal/Button";
import InfoModal from "../../universal/InfoModal";

const TeamUtilityButtons = ({ editFunction, description, deleteFunction }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfoClicked = () => {
    setShowInfo((prev) => !prev);
  };
  return (
    <div className="teams__utility-buttons">
      <InfoModal
        text={description}
        clickFunction={handleShowInfoClicked}
        showInfo={showInfo}
        page="team"
      />
      <Button
        buttonCategory="icon"
        buttonIcon="editIcon"
        clickFunction={editFunction}
      />
      <Button
        buttonCategory="icon"
        buttonIcon="deleteIcon"
        clickFunction={deleteFunction}
      />
    </div>
  );
};

export default TeamUtilityButtons;
