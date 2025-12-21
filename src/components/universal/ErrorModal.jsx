import Modal from "./Modal";

const ErrorModal = ({ error, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="modal__error">{error}</h3>
    </Modal>
  );
};

export default ErrorModal;
