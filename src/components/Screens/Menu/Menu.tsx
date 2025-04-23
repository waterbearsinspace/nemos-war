// game store
import { nemosStore } from "../../../common/stores/nemosStore";

//utils
import {
  getPhaseNumber,
  getSubPhaseNumber,
} from "../../../common/scripts/utils/utils";

// css
import "./Menu.css";
import { useNemosCore } from "../../../common/scripts/nemosCore";

export default function Menu() {
  const setPhase = nemosStore((state) => state.setCurrentPhase);

  const { setSubPhase } = useNemosCore();

  const handleClick = () => {
    setPhase(getPhaseNumber("SETUP"));
    setSubPhase("SELECT MOTIVE");
  };

  return (
    <section className="menu">
      <p className="title">Nemo's War</p>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        <p>Start Game</p>
      </button>
    </section>
  );
}
