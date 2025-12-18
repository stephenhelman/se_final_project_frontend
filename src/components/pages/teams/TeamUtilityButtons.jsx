import Button from "../../universal/Button";

const TeamUtilityButtons = ({ editFunction }) => {
  return (
    <div className="teams__utility-buttons">
      <Button buttonCategory="icon" buttonIcon="infoIcon" />
      <Button
        buttonCategory="icon"
        buttonIcon="editIcon"
        clickFunction={editFunction}
      />
      <Button buttonCategory="icon" buttonIcon="deleteIcon" />
    </div>
  );
};

export default TeamUtilityButtons;
