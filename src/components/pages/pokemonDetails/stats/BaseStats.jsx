import Stat from "./Stat";

const BaseStats = ({ pokemon }) => {
  const stats = pokemon.stats;
  const statsContent = Object.entries(stats).map((stat, i) => {
    return <Stat stat={stat} key={i} type="base-stat" />;
  });
  return (
    <section className="stats__stats-card">
      <h4 className="stats__title">Base Stats</h4>
      <ul className="stats__stats-section">{statsContent}</ul>
    </section>
  );
};

export default BaseStats;
