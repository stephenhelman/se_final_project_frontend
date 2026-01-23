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
  clearArray,
  buttons,
  showFilterMenu,
  handleSelect,
  toggleState,
  handleReset,
}) => {
  return (
    <main className={mainClass}>
      <Sidebar
        filterFunction={filterFunction}
        clearArray={clearArray}
        values={values}
        showFilterMenu={showFilterMenu}
        handleSelect={handleSelect}
        toggleState={toggleState}
        handleReset={handleReset}
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
