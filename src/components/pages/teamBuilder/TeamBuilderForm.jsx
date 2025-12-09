import TeamPlayers from "../../universal/TeamPlayers";
import Button from "../../universal/Button";

const TeamBuilderForm = () => {
  const team = [
    { id: 1, name: "Bulbasaur" },
    { id: 4, name: "Charmander" },
    { id: 7, name: "Squirtle" },
  ];
  return (
    <form className="team-builder__form form">
      <h2 className="form__title">Team Builder</h2>
      <fieldset className="form__fieldset">
        <label htmlFor="team-name" className="form__label">
          Team Name
          <input
            type="text"
            placeholder="Enter your team's name..."
            className="form__input"
          />
        </label>
        <label htmlFor="team-description" className="form__label">
          Description
          <input
            type="text"
            placeholder="Enter your team's description"
            className="form__input"
          />
        </label>
        <div className="form__team-wrapper">
          <TeamPlayers team={team} page="team-builder" />
        </div>
      </fieldset>
      <div className="form__submit-buttons">
        <Button
          buttonCategory="primary"
          buttonText="Save Team"
          buttonType="submit"
        />
        <Button
          buttonCategory="ghost"
          buttonText="Cancel"
          buttonType="button"
        />
      </div>
    </form>
  );
};

export default TeamBuilderForm;
