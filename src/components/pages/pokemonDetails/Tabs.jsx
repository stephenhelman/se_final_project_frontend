import "../../../blocks/Tabs.css";
import Button from "../../universal/Button";

const Tabs = ({ activeTab, handleTabClick }) => {
  const handleTypesClick = () => handleTabClick("types");
  const handleStatsClick = () => handleTabClick("stats");
  const handleEvolutionsClick = () => handleTabClick("evolutions");
  const handleMovesClick = () => handleTabClick("moves");

  return (
    <ul className="tabs__navbar">
      <li className="tabs__list-item">
        <Button
          buttonCategory="link"
          size="tab"
          isActive={activeTab === "types"}
          clickFunction={handleTypesClick}
          buttonText="Types"
        />
      </li>
      <li className="tabs__list-item">
        <Button
          buttonCategory="link"
          size="tab"
          isActive={activeTab === "stats"}
          clickFunction={handleStatsClick}
          buttonText="Stats"
        />
      </li>
      <li className="tabs__list-item">
        <Button
          buttonCategory="link"
          size="tab"
          isActive={activeTab === "evolutions"}
          clickFunction={handleEvolutionsClick}
          buttonText="Evolutions"
        />
      </li>
      <li className="tabs__list-item">
        <Button
          buttonCategory="link"
          size="tab"
          isActive={activeTab === "moves"}
          clickFunction={handleMovesClick}
          buttonText="Moves"
        />
      </li>
    </ul>
  );
};

export default Tabs;
