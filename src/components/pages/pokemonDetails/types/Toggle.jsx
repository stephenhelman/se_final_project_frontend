import Button from "../../../universal/Button";

const Toggle = ({ toggleFunction, activeCard }) => {
  return (
    <div className="types__toggle-wrapper">
      <button
        className={`types__toggle-switch ${
          activeCard === "attack" ? "types__toggle-switch_active" : ""
        }`}
        onClick={() => toggleFunction("attack")}
      >
        Attack
      </button>
      <button
        className={`types__toggle-switch ${
          activeCard === "defense" ? "types__toggle-switch_active" : ""
        }`}
        onClick={() => toggleFunction("defense")}
      >
        Defense
      </button>
    </div>
  );
};

export default Toggle;
