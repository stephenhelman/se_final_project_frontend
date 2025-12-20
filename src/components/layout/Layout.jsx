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
  toggleState,
  sortOptions,
  handleSelect,
  clearArray,
}) => {
  return (
    <main className={mainClass}>
      <Sidebar
        filterFunction={filterFunction}
        clearArray={clearArray}
        selectedTypes={values.selectedTypes}
      />
      <ContentWrapper
        title={title}
        page={page}
        searchPlaceholder={searchPlaceholder}
        values={values}
        handleChange={handleChange}
        toggleState={toggleState}
        sortOptions={sortOptions}
        handleSelect={handleSelect}
      >
        {children}
      </ContentWrapper>
    </main>
  );
};

export default PageLayout;
