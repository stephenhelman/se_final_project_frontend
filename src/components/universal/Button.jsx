//universal button component - primary, ghost, auth
import "../../blocks/Button.css";

const Button = ({
  buttonCategory,
  buttonText,
  buttonType,
  buttonIcon,
  clickFunction = null,
}) => {
  if (buttonCategory === "icon") {
    const buttonName = buttonIcon.split("/")[2].replace(".svg", "");
    return (
      <button className={`button button_type_${buttonCategory}`} type="button">
        <img src={buttonIcon} alt={buttonName} className="button__image" />
      </button>
    );
  }
  return (
    <button
      type={buttonType}
      className={`button button_type_${buttonCategory}`}
      onClick={clickFunction ? clickFunction : null}
    >
      {buttonText}
    </button>
  );
};

export default Button;
