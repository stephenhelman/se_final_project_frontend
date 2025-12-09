import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  return (
    <main className="team-builder">
      <TeamBuilderForm />
      <TeamBuilderSelector />
    </main>
  );
};

export default TeamBuilderPage;
