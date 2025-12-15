import { useDataContext } from "../../hooks/useDataContext";

const BrandInfo = () => {
  const { iconConfig } = useDataContext();
  return (
    <>
      <img
        src={iconConfig.logoIcon}
        alt="Pokemon Trainer Hub Logo"
        className="navbar__logo"
      />
      <h3 className="navbar__title">Pokémon Trainer Hub</h3>
    </>
  );
};

export default BrandInfo;
