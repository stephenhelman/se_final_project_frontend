//universal button component - primary, ghost, auth
import "../../blocks/Button.css";

const Button = ({ buttonCategory, buttonText, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={`button button_type_${buttonCategory}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
