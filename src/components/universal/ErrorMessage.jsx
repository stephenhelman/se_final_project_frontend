import "../../blocks/ErrorMessage.css";

//types => form, message
const ErrorMessage = ({ message, type = "message", category = "error" }) => {
  if (!message) return null;

  const baseClass = "error";
  const typeClass = `${baseClass}_type_${type}`;
  const categoryClass = `${typeClass}-${category}`;
  const combinedClass = `${baseClass} ${typeClass} ${categoryClass}`.trim();

  return (
    <div className={combinedClass} role="alert">
      <span className="error__text">{message}</span>
    </div>
  );
};

export default ErrorMessage;
