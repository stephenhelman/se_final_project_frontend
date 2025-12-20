//universal button component - primary, ghost, auth
import "../../blocks/Button.css";
import { iconConfig } from "../../utils/imageUtils";

const Button = ({
  buttonCategory,
  buttonText,
  buttonType,
  buttonIcon,
  isActive,
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
        <img
          src={iconConfig[buttonIcon]}
          alt={buttonName}
          className="button__image"
        />
      </button>
    );
  }
  return (
    <button
      type={buttonType}
      className={`button button_type_${buttonCategory} ${
        isActive ? `button_type_${buttonCategory}_active` : ""
      }`}
      onClick={clickFunction ? clickFunction : null}
    >
      {buttonText}
    </button>
  );
};

export default Button;
