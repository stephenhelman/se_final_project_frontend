import RedirectText from "./RedirectText";
import Modal from "../universal/Modal";
import Button from "../universal/Button";

import "../../blocks/Auth.css";
import ErrorMessage from "../universal/ErrorMessage";

const AuthModal = ({
  children,
  title,
  description,
  submitText,
  redirectText,
  target,
  onClose,
  onSwitch,
  onSubmit,
  isOpen,
  activeModal,
  error,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <div className="auth-modal__header">
          <Button
            buttonCategory="link"
            size="md"
            buttonText="Register"
            clickFunction={() => onSwitch("register")}
            buttonType="button"
            isActive={activeModal === "register"}
          />
          <Button
            buttonCategory="link"
            size="md"
            buttonText="Login"
            clickFunction={() => onSwitch("login")}
            buttonType="button"
            isActive={activeModal === "login"}
          />
        </div>
        {error && <ErrorMessage type="message" message={error} />}
        <form className="auth-modal__form" onSubmit={onSubmit}>
          <div className="auth-modal__form-header">
            <h2 className="auth-modal__form-title">{title}</h2>
            <p className="auth-modal__form-description">{description}</p>
          </div>
          {children}
          <Button
            buttonType="submit"
            buttonCategory="auth"
            size="primary"
            buttonText={submitText}
          />
        </form>
        <RedirectText
          redirectText={redirectText}
          target={target}
          onSwitch={onSwitch}
        />
      </div>
    </Modal>
  );
};

export default AuthModal;
