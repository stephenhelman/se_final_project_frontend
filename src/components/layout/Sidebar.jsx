//present on both pages (Pokedex and Teams)
import TypeFiltersContent from "./filters/TypeFiltersContent";
import Button from "../universal/Button";

import "../../blocks/Sidebar.css";

const Sidebar = ({ filterFunction, clearArray, selectedTypes }) => {
  const handleClearFilters = () => {
    clearArray("selectedTypes");
  };
  return (
    <section className="sidebar">
      <div className="sidebar__header">
        <h4 className="sidebar__title">Filters</h4>
        <Button
          buttonText="Clear"
          buttonType="button"
          buttonCategory="ghost"
          clickFunction={handleClearFilters}
        />
      </div>
      <TypeFiltersContent
        filterFunction={filterFunction}
        selectedTypes={selectedTypes}
      />
    </section>
  );
};

export default Sidebar;
