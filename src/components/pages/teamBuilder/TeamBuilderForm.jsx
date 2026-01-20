import TeamPlayers from "../../universal/TeamPlayers";
import Button from "../../universal/Button";
import ErrorMessage from "../../universal/ErrorMessage";

const TeamBuilderForm = ({
  values,
  handleChange,
  handleCancel,
  handleSubmit,
  onTeamChange,
  formErrors,
  generalError,
}) => {
  return (
    <form
      className="team-builder__form form"
      onReset={handleCancel}
      onSubmit={handleSubmit}
    >
      {generalError && <ErrorMessage type="error" message={generalError} />}
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
          />
          {formErrors.name && (
            <ErrorMessage type="form" message={formErrors.name} />
          )}
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
          />
          {formErrors.description && (
            <ErrorMessage type="form" message={formErrors.description} />
          )}
        </label>

        <label htmlFor="team-players" className="form__label">
          <TeamPlayers
            team={values.players}
            page="team-builder"
            onTeamChange={onTeamChange}
          />
          {formErrors.players && (
            <ErrorMessage type="form" message={formErrors.players} />
          )}
        </label>
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
