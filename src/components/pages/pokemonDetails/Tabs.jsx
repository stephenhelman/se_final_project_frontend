//Row of tabs to naviagte different sections in details
import "../../../blocks/Tabs.css";

const Tabs = ({ activeTab, handleTabClick }) => {
  const handleTypesClick = () => handleTabClick("types");
  const handleStatsClick = () => handleTabClick("stats");
  const handleEvolutionsClick = () => handleTabClick("evolutions");
  const handleMovesClick = () => handleTabClick("moves");

  return (
    <ul className="tabs__navbar">
      <li className="tabs__list-item">
        <button
          className={`tabs__nav-button ${
            activeTab === "types" ? "tabs__nav-button_active" : ""
          }`}
          onClick={handleTypesClick}
        >
          Types
        </button>
      </li>
      <li className="tabs__list-item">
        <button
          className={`tabs__nav-button ${
            activeTab === "stats" ? "tabs__nav-button_active" : ""
          }`}
          onClick={handleStatsClick}
        >
          Stats
        </button>
      </li>
      <li className="tabs__list-item">
        <button
          className={`tabs__nav-button ${
            activeTab === "evolutions" ? "tabs__nav-button_active" : ""
          }`}
          onClick={handleEvolutionsClick}
        >
          Evolutions
        </button>
      </li>
      <li className="tabs__list-item">
        <button
          className={`tabs__nav-button ${
            activeTab === "moves" ? "tabs__nav-button_active" : ""
          }`}
          onClick={handleMovesClick}
        >
          Moves
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
