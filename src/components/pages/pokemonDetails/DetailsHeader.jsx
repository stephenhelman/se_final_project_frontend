import Button from "../../universal/Button";

const DetailsHeader = ({
  pokemon,
  handleToggleFavorite,
  handleNavigateBack,
  isFavorite,
}) => {
  return (
    <header className="pokemon-details__header">
      <div className="pokemon-details__button-wrap">
        <Button
          buttonCategory="icon"
          buttonIcon="backIcon"
          size="md"
          clickFunction={handleNavigateBack}
        />
      </div>
      <div className="pokemon-details__title">
        <p className="pokemon-details__id">{pokemon.formattedId}</p>
        <h3 className="pokemon-details__name">{pokemon.name}</h3>
      </div>
      <div className="pokemon-details__button-wrap">
        <Button
          buttonCategory="icon"
          buttonIcon={isFavorite ? "favoriteIconActive" : "favoriteIcon"}
          size="md"
          clickFunction={handleToggleFavorite}
        />
      </div>
    </header>
  );
};

export default DetailsHeader;
