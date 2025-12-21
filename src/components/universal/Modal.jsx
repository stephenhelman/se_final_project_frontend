import useModalClose from "../../hooks/useModalClose";

const Modal = ({ isOpen, onClose, children }) => {
  useModalClose(isOpen ? true : false, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>{children}</div>
  );
};

export default Modal;
