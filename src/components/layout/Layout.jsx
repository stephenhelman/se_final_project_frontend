import Sidebar from "./Sidebar";
import ContentWrapper from "./ContentWrapper";

const PageLayout = ({
  children,
  mainClass,
  filterFunction,
  title,
  page,
  searchPlaceholder,
  values,
  handleChange,
}) => {
  return (
    <main className={mainClass}>
      <Sidebar filterFunction={filterFunction} />
      <ContentWrapper
        title={title}
        page={page}
        searchPlaceholder={searchPlaceholder}
        values={values}
        handleChange={handleChange}
      >
        {children}
      </ContentWrapper>
    </main>
  );
};

export default PageLayout;
