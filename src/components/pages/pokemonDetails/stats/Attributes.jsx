//attributes card
import Stat from "./Stat";
import TypeChip from "../../../universal/TypeChip";

const Attributes = ({ pokemon }) => {
  //title
  //attributes section
  //egg groups section
  const attributes = pokemon.attributes;
  const eggGroups = pokemon.eggGroups;
  const attributesContent = Object.entries(attributes).map(
    (attribute, index) => {
      return <Stat stat={attribute} key={index} type="attribute" />;
    }
  );
  const eggGroupContent = eggGroups.map((egg, index) => {
    return (
      <li key={index} className="stats__list-item stats__list-item-egg">
        <TypeChip type={egg} size="large" />
      </li>
    );
  });
  return (
    <section className="stats__stats-card">
      <h4 className="stats__title">Attributes</h4>
      <ul className="stats__stats-section">{attributesContent}</ul>
      <p className="stats__egg-title">Egg Groups</p>
      <ul className="stats__stats-section">{eggGroupContent}</ul>
    </section>
  );
};

export default Attributes;
