import useDataContext from "../../../hooks/useDataContext";

const DetailsHeader = ({
  pokemon,
  handleToggleFavorite,
  handleNavigateBack,
  isFavorite,
}) => {
  const { iconConfig } = useDataContext();

  return (
    <header className="pokemon-details__header">
      <button
        className="pokemon-details__header-button"
        onClick={handleNavigateBack}
      >
        <img
          src={iconConfig.backIcon}
          alt="back button"
          className="pokemon-details__header-icon"
        />
      </button>
      <div className="pokemon-details__title">
        <p className="pokemon-details__id">{pokemon.formattedId}</p>
        <h3 className="pokemon-details__name">{pokemon.name}</h3>
      </div>
      <button
        className="pokemon-details__header-button"
        onClick={handleToggleFavorite}
      >
        <img
          src={
            isFavorite ? iconConfig.favoriteIconActive : iconConfig.favoriteIcon
          }
          alt="favorite button"
          className="pokemon-details__header-icon"
        />
      </button>
    </header>
  );
};

export default DetailsHeader;
