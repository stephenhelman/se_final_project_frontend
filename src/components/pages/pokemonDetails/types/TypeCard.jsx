import CardRow from "./CardRow";

const TypeCard = ({ stats }) => {
  const content = stats.map((stat, index) => {
    return (
      <li key={index} className="types-tab__list-item">
        <CardRow stat={stat} />
      </li>
    );
  });
  return <ul className="types-tab__card-row-wrapper">{content}</ul>;
};

export default TypeCard;
