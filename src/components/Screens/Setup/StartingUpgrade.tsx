// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// data and constants
import upgradeData from "../../../common/data/upgrades.json";
const upgradeDescriptionText =
"Would you like to purchase your motive's starting upgrade by spending any 3 Ship Resources? If not, it will be available for purchase later and you will keep your Ship Resources.";

// utils
import { getSubPhaseNumber } from "../../../common/utils/utils";

export default function StartingUpgrade() {
  const motive = nemosStore((state) => state.motiveName);
  let motiveUpgrade = upgradeData.find((upgrade) => upgrade.motive == motive);
  let setSubPhase = nemosStore((state) => state.setSubPhase);

  const handleContinue = () => {
    setSubPhase(getSubPhaseNumber("PREPSHIPS"));
  };

  return (
    <div className="upgrade-screen-wrapper">
      <h1 className="sub-phase">Pay for Upgrade</h1>
      <p className="phase-description">{upgradeDescriptionText}</p>
      <section className="tile">
        <p className="tile-name">{motiveUpgrade?.name}</p>
        <p className="tile-info">{motiveUpgrade?.flavorText}</p>
        <p>(Effect goes here.)</p>
      </section>
      <button onClick={handleContinue}>Pass for now</button>
    </div>
  );
}
