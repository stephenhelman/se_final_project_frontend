import { useNavigate } from "react-router-dom";

import TeamPlayers from "../../universal/TeamPlayers";
import Button from "../../universal/Button";

const TeamBuilderForm = ({ values, handleChange, clearDraft }) => {
  const navigate = useNavigate();

  const handleCancelClicked = () => {
    if (clearDraft) {
      clearDraft();
    }
    navigate("/teams");
  };

  return (
    <form className="team-builder__form form" onReset={handleCancelClicked}>
      <h2 className="form__title">Team Builder</h2>
      <fieldset className="form__fieldset">
        <label htmlFor="name" className="form__label">
          Team Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your team's name..."
            className="form__input"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description" className="form__label">
          Description
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter your team's description"
            className="form__input"
            value={values.description}
            onChange={handleChange}
            required
          />
        </label>

        <TeamPlayers team={values.players} page="team-builder" />
      </fieldset>
      <div className="form__submit-buttons">
        <Button
          buttonCategory="primary"
          buttonText="Save Team"
          buttonType="submit"
        />
        <Button buttonCategory="ghost" buttonText="Cancel" buttonType="reset" />
      </div>
    </form>
  );
};

export default TeamBuilderForm;
