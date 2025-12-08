import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import TeamRowsContainer from "./TeamRowsContainer";

const TeamsPage = () => {
  return (
    <>
      <Sidebar />
      <ContentWrapper
        title="Teams"
        page="teams"
        searchPlaceholder="Search Teams"
      >
        <TeamRowsContainer />
      </ContentWrapper>
    </>
  );
};

export default TeamsPage;
