// game store
import { nemosStore } from "../../../common/stores/nemosStore";

//utils
import {
  getPhaseNumber,
  getSubPhaseNumber,
} from "../../../common/scripts/utils/utils";

// css
import "./Menu.css";

export default function Menu() {
  const setPhase = nemosStore((state) => state.setCurrentPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);

  const handleClick = () => {
    setPhase(getPhaseNumber("SETUP"));
    setSubPhase(getSubPhaseNumber("SELECT MOTIVE"));
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
