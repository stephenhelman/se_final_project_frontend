import TypeChip from "../../../universal/TypeChip";

const CardRow = ({ stat }) => {
  let types;
  if (!stat.types.length) {
    types = (
      <li className="types-tab__list-item">
        <TypeChip type="none" size="small" isActive="false" />
      </li>
    );
  } else {
    types = stat.types.map((type, index) => {
      return (
        <li key={index} className="types-tab__list-item">
          <TypeChip type={type} size="small" isActive={false} />
        </li>
      );
    });
  }
  return (
    <>
      <p className="types-tab__stat-title">{stat.name}</p>
      <ul className="types-tab__stat-chips-wrapper">{types}</ul>
    </>
  );
};

export default CardRow;
