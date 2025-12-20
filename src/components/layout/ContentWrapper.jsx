import SearchBar from "../universal/SearchBar";

const ContentWrapper = ({
  children,
  title,
  page,
  searchPlaceholder,
  values,
  handleChange,
  toggleState,
  sortOptions,
  handleSelect,
}) => {
  return (
    <section className={`${page}__content`}>
      <h1 className={`${page}__title`}>{title}</h1>
      <SearchBar
        placeholder={searchPlaceholder}
        page={page}
        values={values}
        handleChange={handleChange}
        toggleState={toggleState}
        sortOptions={sortOptions}
        handleSelect={handleSelect}
      />
      {children}
    </section>
  );
};

export default ContentWrapper;
