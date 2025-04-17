// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// data and constants
import upgradeData from "../../../../common/data/upgrades.json";
const upgradeDescriptionText =
  "Would you like to purchase your motive's starting upgrade by spending any 3 Ship Resources? If not, it will be available for purchase later and you will keep your Ship Resources.";

// utils
import { getSubPhaseNumber } from "../../../../common/scripts/utils/utils";
import { useNemosCore } from "../../../../common/scripts/nemosCore";
import UpgradeInstructions from "../../../../common/scripts/utils/UpgradeInstructions";

export default function StartingUpgrade() {
  // store selectors
  const motive = nemosStore((state) => state.motiveName);
  const motiveUpgrade = upgradeData.find((upgrade) => upgrade.motive == motive);
  const addToCurrentUpgrades = nemosStore(
    (state) => state.addToCurrentUpgrades
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const nemoValue = nemosStore((state) => state.nemo.value);
  const crewValue = nemosStore((state) => state.crew.value);
  const hullValue = nemosStore((state) => state.hull.value);

  const totalLessUpgradeCost = 6 + 10 + 10 - 3;
  const resourcesToPay =
    nemoValue + crewValue + hullValue - totalLessUpgradeCost;

  const resourcesPayable = resourcesToPay <= 3 && resourcesToPay > 0;
  const nemoPayable = resourcesPayable && nemoValue > 3;
  const crewPayable = resourcesPayable && crewValue > 7;
  const hullPayable = resourcesPayable && hullValue > 7;

  const resourcesRefundable = resourcesToPay < 3 && resourcesToPay >= 0;
  const nemoRefundable = resourcesRefundable && nemoValue < 6;
  const crewRefundable = resourcesRefundable && crewValue < 10;
  const hullRefundable = resourcesRefundable && hullValue < 10;

  const handleContinue = () => {
    if (!resourcesPayable) {
      addToCurrentUpgrades(motiveUpgrade!);
    }
    setSubPhase(getSubPhaseNumber("PREP SHIPS"));
  };

  const { adjustNemoBy, adjustCrewBy, adjustHullBy } = useNemosCore();

  return (
    <div className="upgrade-screen-wrapper">
      <h1 className="sub-phase">Pay for Upgrade</h1>
      <p className="phase-description">{upgradeDescriptionText}</p>
      <section className="tile tile-motive">
        <h2 className="tile-name">{motiveUpgrade?.name}</h2>
        {UpgradeInstructions(motiveUpgrade!.name)}
        <p className="tile-info">
          <em>{motiveUpgrade?.flavorText}</em>
        </p>
      </section>
      <header>
        <p>
          Pay any <strong>{resourcesToPay}</strong> Resources below or Pass
        </p>
      </header>
      <div className="upgrade-screen-resources">
        <div className="nemo">
          <p>Nemo</p>
          <div className="resource-buttons">
            <button
              className={nemoPayable ? "" : "disabled"}
              onClick={() => {
                if (nemoPayable) {
                  adjustNemoBy(-1);
                }
              }}
            >
              -
            </button>
            <span>
              <strong>{nemoValue}</strong>
            </span>
            <button
              className={nemoRefundable ? "" : "disabled"}
              onClick={() => {
                if (nemoRefundable) {
                  adjustNemoBy(1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="crew">
          <p>Crew</p>
          <div className="resource-buttons">
            <button
              className={crewPayable ? "" : "disabled"}
              onClick={() => {
                if (crewPayable) {
                  adjustCrewBy(-1);
                }
              }}
            >
              -
            </button>
            <strong>{crewValue}</strong>
            <button
              className={crewRefundable ? "" : "disabled"}
              onClick={() => {
                if (crewRefundable) {
                  adjustCrewBy(1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="hull">
          <p>Hull</p>
          <div className="resource-buttons">
            <button
              className={hullPayable ? "" : "disabled"}
              onClick={() => {
                if (hullPayable) {
                  adjustHullBy(-1);
                }
              }}
            >
              -
            </button>
            <strong>{hullValue}</strong>
            <button
              className={hullRefundable ? "" : "disabled"}
              onClick={() => {
                if (hullRefundable) {
                  adjustHullBy(1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button onClick={handleContinue}>
        {resourcesPayable ? "Pass" : "Pay Resources"}
      </button>
    </div>
  );
}
