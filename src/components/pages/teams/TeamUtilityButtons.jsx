import Button from "../../universal/Button";

const TeamUtilityButtons = () => {
  return (
    <div className="teams__utility-buttons">
      <Button buttonCategory="icon" buttonIcon="src/images/info.svg" />
      <Button buttonCategory="icon" buttonIcon="src/images/edit.svg" />
      <Button buttonCategory="icon" buttonIcon="src/images/delete.svg" />
    </div>
  );
};

export default TeamUtilityButtons;
