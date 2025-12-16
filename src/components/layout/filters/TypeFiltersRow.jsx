import TypeChip from "../../universal/TypeChip";

const TypeFiltersRow = ({ label, types, filterFunction }) => {
  const content = types.map((type) => {
    return (
      <li key={type} className="sidebar__type-chip">
        <TypeChip type={type} size="large" clickFunction={filterFunction} />
      </li>
    );
  });
  return (
    <li className="sidebar__filter-section">
      <p className="sidebar__filter-section-title">{label}</p>
      <ul className="sidebar__types-row">{content}</ul>
    </li>
  );
};

export default TypeFiltersRow;
