import TypeChip from "../../universal/TypeChip";

const TypeFiltersRow = ({ label, types }) => {
  const content = types.map((type) => {
    return (
      <li key={type}>
        <TypeChip type={type} size="large" />
      </li>
    );
  });
  return (
    <li>
      <p>{label}</p>
      <ul>{content}</ul>
    </li>
  );
};

export default TypeFiltersRow;
