import TeamBuilderForm from "./TeamBuilderForm";
import TeamBuilderSelector from "./TeamBuilderSelector";
import Preloader from "../../universal/Preloader";

import useForm from "../../../hooks/useForm";
import { useDataContext } from "../../../hooks/useDataContext";

import "../../../blocks/TeamBuilderPage.css";

const TeamBuilderPage = () => {
  const { index, isLoading } = useDataContext();

  const { values, setValues, handleChange, addToArray, removeFromArray } =
    useForm({
      name: "",
      description: "",
      players: [],
    });

  if (isLoading || !index.length) return <Preloader />;

  return (
    <main className="team-builder">
      <TeamBuilderForm
        values={values}
        setValues={setValues}
        handleChange={handleChange}
      />
      <TeamBuilderSelector data={index} selectedPokemon={values.players} />
    </main>
  );
};

export default TeamBuilderPage;
