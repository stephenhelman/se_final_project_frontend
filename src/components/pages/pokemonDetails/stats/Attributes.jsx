//attributes card
import Stat from "./Stat";

const Attributes = ({ pokemon }) => {
  const attributes = pokemon.attributes;
  const attributesContent = Object.entries(attributes).map(
    (attribute, index) => {
      return <Stat stat={attribute} key={index} type="attribute" />;
    }
  );

  return (
    <section className="stats__stats-card">
      <h4 className="stats__title">Attributes</h4>
      <ul className="stats__stats-section">{attributesContent}</ul>
    </section>
  );
};

export default Attributes;
