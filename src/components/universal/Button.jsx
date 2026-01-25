import "../../blocks/Button.css";
import icons from "../../utils/imageUtils";

const Button = ({
  buttonCategory,
  buttonText,
  buttonType,
  buttonIcon,
  isActive,
  clickFunction = null,
  size = "",
}) => {
  if (buttonCategory === "icon") {
    const nameArray = buttonIcon.split("/");
    const buttonName = nameArray[nameArray.length - 1].replace(".svg", "");
    return (
      <button
        className={`button button_type_${buttonCategory} ${size ? `button_type_${buttonCategory}-${size}` : ""}`}
        type="button"
        onClick={clickFunction ? clickFunction : null}
      >
        <img
          src={size.includes("sprite") ? buttonIcon : icons[buttonIcon]}
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
      } ${size ? `button_type_${buttonCategory}-${size}` : ""}`}
      onClick={clickFunction ? clickFunction : null}
    >
      {buttonText}
    </button>
  );
};

export default Button;
