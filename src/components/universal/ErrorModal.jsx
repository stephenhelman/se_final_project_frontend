import Modal from "./Modal";

const ErrorModal = ({ buttonText, isOpen, message, onClose, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal__error">
        <h3 className="modal__error-title">{title}</h3>
        <p className="modal__error-message">{message}</p>
        <button className="button button_type_ghost" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
