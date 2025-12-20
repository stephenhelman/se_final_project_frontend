import { capitalize } from "../../../../utils/utils";

const InfoRow = ({ title, value }) => {
  const titleObject = {
    growthRate: "Growth Rate",
    trigger: "Trigger",
    expRequired: "EXP Required",
    levelRequired: "Level Required",
    item: "Item",
    method: "Method",
    minLevel: "Minimum Level",
  };

  return (
    <div className="evolution__info-row">
      <p className="evolution__info-row-title">{titleObject[title]}</p>
      <p className="evolution__info-row-value">{capitalize(value)}</p>
    </div>
  );
};

export default InfoRow;
