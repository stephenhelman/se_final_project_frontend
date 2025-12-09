import Sidebar from "../../layout/Sidebar";
import ContentWrapper from "../../layout/ContentWrapper";
import TeamRowsContainer from "./TeamRowsContainer";
import "../../../blocks/TeamsPage.css";

const TeamsPage = () => {
  return (
    <main className="teams">
      <Sidebar />
      <ContentWrapper
        title="Teams"
        page="teams"
        searchPlaceholder="Search Teams"
      >
        <TeamRowsContainer />
      </ContentWrapper>
    </main>
  );
};

export default TeamsPage;
