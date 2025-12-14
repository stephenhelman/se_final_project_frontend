import Button from "../../universal/Button";

const TeamUtilityButtons = ({ editFunction }) => {
  return (
    <div className="teams__utility-buttons">
      <Button buttonCategory="icon" buttonIcon="src/images/info.svg" />
      <Button
        buttonCategory="icon"
        buttonIcon="src/images/edit.svg"
        clickFunction={editFunction}
      />
      <Button buttonCategory="icon" buttonIcon="src/images/delete.svg" />
    </div>
  );
};

export default TeamUtilityButtons;
