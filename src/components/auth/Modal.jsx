import RedirectText from "./RedirectText";
const Modal = ({
  children,
  title,
  description,
  submitText,
  redirectText,
  target,
}) => {
  return (
    <div>
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
      <form>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
        <button>{submitText}</button>
      </form>
      <RedirectText redirectText={redirectText} target={target} />
    </div>
  );
};

export default Modal;
