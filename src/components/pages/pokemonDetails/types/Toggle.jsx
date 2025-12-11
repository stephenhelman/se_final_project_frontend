const Toggle = ({ toggleFunction, activeCard }) => {
  return (
    <div className="types-tab__toggle-wrapper">
      <button
        className={`types-tab__toggle-switch ${
          activeCard === "attack" ? "types-tab__toggle-switch_active" : ""
        }`}
        onClick={() => toggleFunction("attack")}
      >
        Attack
      </button>
      <button
        className={`types-tab__toggle-switch ${
          activeCard === "defense" ? "types-tab__toggle-switch_active" : ""
        }`}
        onClick={() => toggleFunction("defense")}
      >
        Defense
      </button>
    </div>
  );
};

export default Toggle;
