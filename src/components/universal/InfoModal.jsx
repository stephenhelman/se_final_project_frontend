import Button from "./Button";
import Modal from "./Modal";

import "../../blocks/InfoModal.css";

const InfoModal = ({
  text,
  clickFunction,
  showInfo,
  isBreakpoint,
  isOpen,
  onClose,
  coordinates,
}) => {
  const content = isBreakpoint ? (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="info-modal__text-wrapper "
        style={{
          "--modal-x": `${coordinates.x}px`,
          "--modal-y": `${coordinates.y}px`,
        }}
      >
        <p className="info-modal__text">{text}</p>
      </div>
    </Modal>
  ) : (
    <div className="info-modal">
      <Button
        buttonCategory="icon"
        buttonType="button"
        buttonIcon="infoIcon"
        clickFunction={clickFunction}
      />
      {showInfo && (
        <div className="info-modal__text-wrapper ">
          <p className="info-modal__text">{text}</p>
        </div>
      )}
    </div>
  );
  return content;
};

export default InfoModal;
