import Button from "../../universal/Button";
import Modal from "../../universal/Modal";
import "../../../blocks/Modal.css";

const ConfirmDeleteModal = ({
  team,
  handleSubmit,
  isOpen,
  onClose,
  handleCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        onReset={handleCancel}
        className="modal__form"
      >
        <h2 className="modal__title">
          Are you sure you want to delete this team?
        </h2>
        <p className="modal__emphasized-text">{team.name}</p>
        <p className="modal__warning-text">This action cannot be undone</p>
        <Button
          buttonCategory="primary"
          buttonText="Delete"
          buttonType="submit"
        />
        <Button buttonCategory="ghost" buttonText="Cancel" buttonType="reset" />
      </form>
    </Modal>
  );
};

export default ConfirmDeleteModal;
