import SearchBar from "../universal/SearchBar";

const ContentWrapper = ({
  children,
  title,
  page,
  searchPlaceholder,
  values,
  handleSelect,
  buttons,
  handleChange,
}) => {
  return (
    <section className={`${page}__content`}>
      <h1 className={`${page}__title`}>{title}</h1>
      <SearchBar
        placeholder={searchPlaceholder}
        values={values}
        buttons={buttons}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
      {children}
    </section>
  );
};

export default ContentWrapper;
