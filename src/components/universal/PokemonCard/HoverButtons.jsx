import Button from "../Button";
import "../../../blocks/HoverButtons.css";

const HoverButtons = ({
  page,
  pokemonCount,
  remove,
  decrement,
  increment,
  navigate,
  lengthOfTeam,
}) => {
  const infoButton = (
    <div className="hover-button hover-button_type_info">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={navigate}
        buttonIcon="infoIcon"
        size="sm"
      />
    </div>
  );
  const addToTeamButton = (
    <div className="hover-button hover-button_type_add">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={increment}
        buttonIcon="addIcon"
        size="sm"
      />
    </div>
  );
  const deleteFromTeamButton = (
    <div className="hover-button hover-button_type_delete">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={remove}
        buttonIcon="deleteIcon"
        size="sm"
      />
    </div>
  );
  const removefromTeamButton = (
    <div className="hover-button hover-button_type_remove">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={decrement}
        buttonIcon="removeIcon"
        size="sm"
      />
    </div>
  );
  const pokemonCountOne = pokemonCount === 1;
  const pokemonCountMultiple = pokemonCount > 1;
  const pokemonNotOnTeam = pokemonCount === 0 || !pokemonCount;

  const maxTeam = lengthOfTeam === 6;

  let content;

  if (page === "team-form") {
    content = (
      <>
        {infoButton}
        {deleteFromTeamButton}
      </>
    );
    return <div className="hover-buttons">{content}</div>;
  }

  if (page === "evolutions") return;

  if (page !== "team-builder") {
    content = infoButton;
    return <div className="hover-buttons">{content}</div>;
  }

  if (maxTeam) {
    if (pokemonCountMultiple) {
      content = (
        <>
          {infoButton}
          {removefromTeamButton}
        </>
      );
    } else if (pokemonCountOne) {
      content = (
        <>
          {infoButton}
          {deleteFromTeamButton}
        </>
      );
    } else {
      content = infoButton;
    }
  } else {
    if (pokemonNotOnTeam) {
      content = (
        <>
          {infoButton}
          {addToTeamButton}
        </>
      );
    }
    if (pokemonCountOne) {
      content = (
        <>
          {infoButton}
          {deleteFromTeamButton}
          {addToTeamButton}
        </>
      );
    }
    if (pokemonCountMultiple) {
      content = (
        <>
          {infoButton}
          {removefromTeamButton}
          {addToTeamButton}
        </>
      );
    }
  }

  return <div className="hover-buttons">{content}</div>;
};

export default HoverButtons;
