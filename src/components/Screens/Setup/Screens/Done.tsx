// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// utils
import {
  getPhaseNumber,
  getSubPhaseNumber,
} from "../../../../common/scripts/utils/utils";

export default function Done() {
  let motive = nemosStore((state) => state.motiveName);
  let upgrades = nemosStore((state) => state.currentUpgrades);
  let nemo = nemosStore((state) => state.nemo);
  let crew = nemosStore((state) => state.crew);
  let hull = nemosStore((state) => state.hull);
  let setPhase = nemosStore((state) => state.setCurrentPhase);
  let setSubPhase = nemosStore((state) => state.setCurrentSubPhase);

  const handleContinue = () => {
    setPhase(getPhaseNumber("EVENT"));
    setSubPhase(getSubPhaseNumber("DRAW EVENT CARD"));
  };

  return (
    <div className="done-screen-wrapper">
      <h1>Ready to Start!</h1>
      <h2>Motive: {motive}</h2>
      <p className="done-screen-upgrade-text">
        Upgrade {upgrades.length > 0 ? <span>{upgrades[0].name}</span> : "Not"}{" "}
        Purchased
      </p>
      <section>
        <h2>Ship Resources</h2>
        <section className="resources">
          <p>
            <span className="bold">Nemo</span>: {nemo.value}
          </p>
          <p>
            <span className="bold">Crew</span>: {crew.value}
          </p>
          <p>
            <span className="bold">Hull</span>: {hull.value}
          </p>
        </section>
      </section>
      <button onClick={handleContinue}>Begin</button>
    </div>
  );
}
