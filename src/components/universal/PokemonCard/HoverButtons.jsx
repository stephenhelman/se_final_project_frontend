import Button from "../Button";

import { useDataContext } from "../../../hooks/useDataContext";
import "../../../blocks/HoverButtons.css";

const HoverButtons = ({
  cardType,
  pokemonCount,
  remove,
  decrement,
  increment,
  navigate,
  lengthOfTeam,
}) => {
  const { iconConfig } = useDataContext();
  const infoButton = (
    <div className="hover-button hover-button_type_info">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={navigate}
        buttonIcon={iconConfig.infoIcon}
      />
    </div>
  );
  const addToTeamButton = (
    <div className="hover-button hover-button_type_add">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={increment}
        buttonIcon={iconConfig.addIcon}
      />
    </div>
  );
  const deleteFromTeamButton = (
    <div className="hover-button hover-button_type_delete">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={remove}
        buttonIcon={iconConfig.deleteIcon}
      />
    </div>
  );
  const removefromTeamButton = (
    <div className="hover-button hover-button_type_remove">
      <Button
        buttonType="button"
        buttonCategory="icon"
        clickFunction={decrement}
        buttonIcon={iconConfig.removeIcon}
      />
    </div>
  );
  const pokemonCountExists = pokemonCount < 0;
  const pokemonCountOne = pokemonCount === 1;
  const pokemonCountMultiple = pokemonCount < 1;

  const maxTeam = lengthOfTeam === 6;

  let content;

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
  } else if (!maxTeam) {
    if (pokemonCountExists) {
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

  if (cardType !== "team-builder") {
    content = infoButton;
  }
  return <div className="hover-buttons">{content}</div>;
};

export default HoverButtons;
