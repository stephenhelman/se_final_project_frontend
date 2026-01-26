import Stat from "./Stat";

const Attributes = ({ pokemon }) => {
  const attributes = pokemon.attributes;
  const attributesContent = Object.entries(attributes).map((attribute, i) => {
    return <Stat stat={attribute} key={i} type="attribute" />;
  });

  return (
    <section className="stats__stats-card">
      <h4 className="stats__title">Attributes</h4>
      <ul className="stats__stats-section">{attributesContent}</ul>
    </section>
  );
};

export default Attributes;
