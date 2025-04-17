// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// data and constants
import motiveData from "../../../common/data/motives.json";
import upgradeData from "../../../common/data/upgrades.json";
const motiveDescriptionText =
  "This represents the driving motivation behind Nemo's quest and determines the scoring multipliers at the end of the game.";

const motiveMultiplierText =
  "Note: These will never cause an individual item's VP to go below 0. As such, applying -1 to something with a VP value of 0 will still only give 0 VP and will not result in negative VP.";

const motiveAdvice = [
  "This motive focuses on inciting uprisings and sinking non-warships. However, it gets less points from treasures.",
  "This motive primarily wants to search out the rarest wonders through treasure and adventures, caring little for warfare.",
  "This motive seeks out scientific progress from adventures, upgrades, and keeping the Nautilus in good condition. It scores less from sinking non-warships.",
  "This motive seeks out violence, gaining more points for sinking warships and inciting uprisings. It sees less value in adventuring.",
];

// utils
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";

export default function MotiveSelector() {
  const motive = nemosStore((state) => state.currentMotive);
  const setCurrentMotive = nemosStore((state) => state.setCurrentMotive);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const motiveUpgrade = upgradeData.find(
    (upgrade) => upgrade.motive == motive?.name
  )?.name;

  const handleCycle = (inc: number) => {
    let motiveId = motive.id;
    if (motiveId + inc > motiveData.length - 1) {
      setCurrentMotive(motiveData[0]);
    } else if (motiveId + inc < 0) {
      setCurrentMotive(motiveData[motiveData.length - 1]);
    } else setCurrentMotive(motiveData[motiveId + inc]);
  };

  const handleConfirm = () => {
    setSubPhase(getSubPhaseNumber("PREP DRAW PILE AND ADVENTURE DECK"));
  };

  const defaultMotive = motiveData.find((motive) => {
    motive.name != "Explore";
  });

  return (
    <div className="motive-screen-wrapper">
      <h1 className="sub-phase">Select a Motive</h1>
      <p className="phase-description">{motiveDescriptionText}</p>
      <p className="motive-multiplier">{motiveMultiplierText}</p>
      <section className="tile">
        <h2 className="tile-name">{motive?.name}</h2>
        <section>
          <p>Associated Upgrade: {motiveUpgrade}</p>
        </section>
        <section className="tile-info">
          <section>
            <p>
              Warships: {motive?.warships < 0 ? "" : "+"}
              {motive?.warships}
            </p>
            <p>
              Non-warships: {motive?.nonWarships < 0 ? "" : "+"}
              {motive?.nonWarships}
            </p>
            <p>
              Adventure Cards: {motive?.adventureCards < 0 ? "" : "+"}
              {motive?.adventureCards}
            </p>
            <p>
              Treasure: {motive?.treasure < 0 ? "" : "+"}
              {motive?.treasure}
            </p>
          </section>
          <section>
            <p>Liberation: x{motive?.liberation}</p>
            <p>Science Discovered: x{motive?.scienceDiscovered}</p>
            <p>Wonders Seen: x{motive?.wondersSeen}</p>
          </section>
        </section>
        <section>
          <p>Act One Cards: 6</p>
          <p>Act Two Cards: {motive?.actTwoCards}</p>
          <p>Act Three Cards: {motive?.actThreeCards + 1}</p>
        </section>
        <div className="motive-advice">
          <p>{motiveAdvice[motive?.id]} </p>
        </div>
      </section>

      <div className="button-wrapper">
        <button
          onClick={() => {
            handleCycle(-1);
          }}
        >
          ←
        </button>
        <button
          onClick={() => {
            handleConfirm();
          }}
          className="motive-confirm"
        >
          <span>Confirm</span>
        </button>
        <button
          onClick={() => {
            handleCycle(1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
