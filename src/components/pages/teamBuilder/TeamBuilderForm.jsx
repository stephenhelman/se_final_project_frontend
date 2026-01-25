import { useNavigate } from "react-router-dom";

import TeamPlayers from "../../universal/TeamPlayers";
import Button from "../../universal/Button";
import ErrorMessage from "../../universal/ErrorMessage";
import PokemonCard from "../../universal/PokemonCard/PokemonCard";
import BlankCard from "./BlankCard";

const TeamBuilderForm = ({
  values,
  handleChange,
  handleCancel,
  handleSubmit,
  onTeamChange,
  formErrors,
  generalError,
  isMobile,
  isTablet,
  activePanel,
}) => {
  const navigate = useNavigate();
  let teamElements;
  if (values.players.length !== 6) {
    teamElements = values.players.map((pokemon, i) => {
      const handleInfoClick = () => {
        navigate(`/pokemon/${pokemon.id}`, {
          state: { from: location.pathname },
        });
      };
      return (
        <li key={i} className="form__list-item">
          <PokemonCard
            pokemon={pokemon}
            lengthOfTeam={values.players.length}
            onTeamChange={onTeamChange}
            onInfo={handleInfoClick}
            page="team-form"
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </li>
      );
    });
    const emptySpaces = 6 - values.players.length;
    for (let i = 0; i < emptySpaces; i++) {
      teamElements.push(
        <li key={i + values.players.length} className="form__list-item">
          <BlankCard />
        </li>,
      );
    }
  } else {
    teamElements = values.players.map((pokemon, i) => {
      const handleInfoClick = () => {
        navigate(`/pokemon/${pokemon.id}`, {
          state: { from: location.pathname },
        });
      };
      return (
        <li key={i} className="form__list-item">
          <PokemonCard
            pokemon={pokemon}
            lengthOfTeam={values.players.length}
            onTeamChange={onTeamChange}
            onInfo={handleInfoClick}
            page="team-form"
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </li>
      );
    });
  }

  return (
    <form
      className={`team-builder__content ${activePanel === "team-form" ? "team-builder__form team-builder__form_visible" : "team-builder__form"} form`}
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

        <div htmlFor="team-players" className="form__label">
          <TeamPlayers
            team={teamElements}
            page="team-builder"
            onTeamChange={onTeamChange}
          />
          {formErrors.players && (
            <ErrorMessage type="form" message={formErrors.players} />
          )}
        </div>
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
