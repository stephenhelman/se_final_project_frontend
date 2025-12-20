import Button from "./Button";

import "../../blocks/InfoModal.css";

const InfoModal = ({ text, clickFunction, showInfo }) => {
  return (
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
};

export default InfoModal;
