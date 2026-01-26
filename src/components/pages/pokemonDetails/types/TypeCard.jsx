import CardRow from "./CardRow";

const TypeCard = ({ stats, isBreakpoint }) => {
  const content = Object.entries(stats).map((stat, i) => {
    return (
      <li key={i} className="types__list-item">
        <CardRow stat={stat} isBreakpoint={isBreakpoint} />
      </li>
    );
  });
  return <ul className="types__card-row-wrapper">{content}</ul>;
};

export default TypeCard;
