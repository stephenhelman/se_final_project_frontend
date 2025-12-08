//present on both pages (Pokedex and Teams)
import TypeFiltersContent from "./filters/TypeFiltersContent";

const Sidebar = () => {
  return (
    <aside>
      <section>
        <h4>Filters</h4>
        <TypeFiltersContent />
      </section>
    </aside>
  );
};

export default Sidebar;
