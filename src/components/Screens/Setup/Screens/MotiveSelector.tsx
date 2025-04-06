// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// data and constants
import motiveData from "../../../../common/data/motives.json";
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
import { getSubPhaseNumber } from "../../../../common/utils/utils";

export default function MotiveSelector() {
  const motive = nemosStore((state) => state.currentMotive);
  const motiveInfo = motiveData.find((motiveEntry) => {
    return motiveEntry.id == motive;
  });
  const setCurrentMotive = nemosStore((state) => state.setCurrentMotive);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);

  const handleCycle = (inc: number) => {
    if (motive + inc > motiveData.length - 1) {
      setCurrentMotive(0);
    } else if (motive + inc < 0) {
      setCurrentMotive(motiveData.length - 1);
    } else setCurrentMotive(motive + inc);
  };

  const handleConfirm = () => {
    setSubPhase(getSubPhaseNumber("PREP DRAW PILE AND ADVENTURE DECK"));
  };

  return (
    <div className="motive-screen-wrapper">
      <h1 className="sub-phase">Select a Motive</h1>
      <p className="phase-description">{motiveDescriptionText}</p>
      <p className="motive-multiplier">{motiveMultiplierText}</p>
      <section className="tile">
        <h2 className="tile-name">{motiveInfo!.name}</h2>
        <section className="tile-info">
          <section>
            <p>
              Warships: {motiveInfo!.warships < 0 ? "" : "+"}
              {motiveInfo!.warships}
            </p>
            <p>
              Non-warships: {motiveInfo!.nonWarships < 0 ? "" : "+"}
              {motiveInfo!.nonWarships}
            </p>
            <p>
              Adventure Cards: {motiveInfo!.adventureCards < 0 ? "" : "+"}
              {motiveInfo!.adventureCards}
            </p>
            <p>
              Treasure: {motiveInfo!.treasure < 0 ? "" : "+"}
              {motiveInfo!.treasure}
            </p>
          </section>
          <section>
            <p>Liberation: x{motiveInfo!.liberation}</p>
            <p>Science Discovered: x{motiveInfo!.scienceDiscovered}</p>
            <p>Wonders Seen: x{motiveInfo!.wondersSeen}</p>
          </section>
        </section>
        <section>
          <p>Act One Cards: 6</p>
          <p>Act Two Cards: {motiveInfo!.actTwoCards}</p>
          <p>Act Three Cards: {motiveInfo!.actThreeCards + 1}</p>
        </section>
        <div className="motive-advice">
          <p>{motiveAdvice[motive]} </p>
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
