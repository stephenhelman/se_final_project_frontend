//universal button component - primary, ghost, auth

const Button = ({ buttonCategory, buttonText, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={`button button__type_${buttonCategory}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
