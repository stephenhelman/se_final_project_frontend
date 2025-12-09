import SearchBar from "../universal/SearchBar";

const ContentWrapper = ({ children, title, page, searchPlaceholder }) => {
  return (
    <section className={`${page}__content`}>
      <h1 className={`${page}__title`}>{title}</h1>
      <SearchBar placeholder={searchPlaceholder} page={page} />
      {children}
    </section>
  );
};

export default ContentWrapper;
