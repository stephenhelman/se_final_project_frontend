import SearchBar from "../universal/SearchBar";

const ContentWrapper = ({ children, title, page, searchPlaceholder }) => {
  return (
    <main>
      <h1>{title}</h1>
      <SearchBar placeholder={searchPlaceholder} page={page} />
      {children}
    </main>
  );
};

export default ContentWrapper;
