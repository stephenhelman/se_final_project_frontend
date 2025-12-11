import { convertStat } from "../../../../utils/utils";
import StatBar from "./StatBar";

const Stat = ({ stat, type }) => {
  let unitOfMeasure;
  switch (stat[0]) {
    case "height":
      unitOfMeasure = "m";
      break;
    case "weight":
      unitOfMeasure = "kg";
      break;
    default:
      unitOfMeasure = "";
      break;
  }

  let reductionFactor;
  switch (unitOfMeasure) {
    case "m":
      reductionFactor = 0.1;
      break;
    case "kg":
      reductionFactor = 0.01;
      break;
    default:
      reductionFactor = 0;
      break;
  }
  return (
    <li className="stats__list-item">
      <div className="stats__stat-header">
        <p
          className="stats__stat-name"
          style={stat[0] === "hp" ? { textTransform: "uppercase" } : {}}
        >
          {stat[0]}
        </p>
        <p className="stats__stat-value">
          {type !== "attribute"
            ? stat[1]
            : `${convertStat(stat[1], reductionFactor)} ${unitOfMeasure}`}
        </p>
      </div>
      {type === "base-stat" && <StatBar stat={stat[1]} />}
    </li>
  );
};

export default Stat;
