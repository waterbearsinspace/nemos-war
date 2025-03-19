// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { getPhaseNumber, getSubPhaseNumber } from "../../../common/utils/utils";

import "./Menu.css";

export default function Menu() {
  const setPhase = nemosStore((state) => state.setPhase);
  const setSubPhase = nemosStore((state) => state.setSubPhase);

  const handleClick = () => {
    setPhase(getPhaseNumber("SETUP"));
    setSubPhase(getSubPhaseNumber("MOTIVE"));
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
