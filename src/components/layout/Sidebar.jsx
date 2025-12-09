//present on both pages (Pokedex and Teams)
import TypeFiltersContent from "./filters/TypeFiltersContent";
import "../../blocks/Sidebar.css";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <h4 className="sidebar__title">Filters</h4>
      <TypeFiltersContent />
    </section>
  );
};

export default Sidebar;
