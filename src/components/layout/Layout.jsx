import Sidebar from "./Sidebar";
import ContentWrapper from "./ContentWrapper";

const PageLayout = ({
  children,
  filterFunction,
  title,
  page,
  searchPlaceholder,
  values,
  handleChange,
  clearArray,
  buttons,
  showFilterMenu,
  handleSelect,
  toggleState,
  handleReset,
}) => {
  return (
    <main className={page}>
      <Sidebar
        filterFunction={filterFunction}
        clearArray={clearArray}
        values={values}
        showFilterMenu={showFilterMenu}
        handleSelect={handleSelect}
        toggleState={toggleState}
        handleReset={handleReset}
        page={page}
      />
      <ContentWrapper
        title={title}
        page={page}
        searchPlaceholder={searchPlaceholder}
        values={values}
        handleChange={handleChange}
        buttons={buttons}
      >
        {children}
      </ContentWrapper>
    </main>
  );
};

export default PageLayout;
