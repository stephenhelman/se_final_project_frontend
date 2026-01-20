import RedirectText from "./RedirectText";
import Modal from "../universal/Modal";

import "../../blocks/Auth.css";

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
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <div className="auth-modal__header">
          <button
            className={`auth-modal__button ${activeModal === "login" ? "auth-modal__button_active" : ""}`}
            onClick={() => onSwitch("login")}
          >
            Login
          </button>
          <button
            className={`auth-modal__button ${activeModal === "register" ? "auth-modal__button_active" : ""}`}
            onClick={() => onSwitch("register")}
          >
            Register
          </button>
        </div>
        <form className="auth-modal__form" onSubmit={onSubmit}>
          <div className="auth-modal__form-header">
            <h2 className="auth-modal__form-title">{title}</h2>
            <p className="auth-modal__form-description">{description}</p>
          </div>
          {children}
          <button className="button button_type_primary button_type_primary-auth">
            {submitText}
          </button>
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
