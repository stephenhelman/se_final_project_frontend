import { iconConfig } from "../../utils/imageUtils";

const BrandInfo = () => {
  const { logoIcon } = iconConfig;
  return (
    <>
      <img
        src={logoIcon}
        alt="Pokemon Trainer Hub Logo"
        className="navbar__logo"
      />
      <h3 className="navbar__title">Pokémon Trainer Hub</h3>
    </>
  );
};

export default BrandInfo;
