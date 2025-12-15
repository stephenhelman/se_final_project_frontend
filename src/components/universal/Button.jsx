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
    const nameArray = buttonIcon.split("/");
    const buttonName = nameArray[nameArray.length - 1].replace(".svg", "");
    return (
      <button
        className={`button button_type_${buttonCategory}`}
        type="button"
        onClick={clickFunction ? clickFunction : null}
      >
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
