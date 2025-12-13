import SearchBar from "../universal/SearchBar";

const ContentWrapper = ({
  children,
  title,
  page,
  searchPlaceholder,
  values,
  handleChange,
}) => {
  return (
    <section className={`${page}__content`}>
      <h1 className={`${page}__title`}>{title}</h1>
      <SearchBar
        placeholder={searchPlaceholder}
        page={page}
        values={values}
        handleChange={handleChange}
      />
      {children}
    </section>
  );
};

export default ContentWrapper;
