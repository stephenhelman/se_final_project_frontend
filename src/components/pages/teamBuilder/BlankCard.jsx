import { iconConfig } from "../../../utils/imageUtils";

const BlankCard = () => {
  return (
    <div className="form__blank-card">
      <img
        src={iconConfig.addIcon}
        alt="Add Pokemon"
        className="form__blank-card-icon"
      />
    </div>
  );
};

export default BlankCard;
