// game store
import { nemosStore } from "../../common/stores/nemosStore";

// data and constants
import motiveData from "../../common/data/motives.json";

export default function MotiveSelector() {
  const motive = nemosStore((state) => state.currentMotive);
  const motiveFull = nemosStore((state) => state);
  const setCurrentMotive = nemosStore((state) => state.setCurrentMotive);

  const handleClick = (inc: number) => {
    if (motive + inc > motiveData.length - 1) {
      setCurrentMotive(0);
    } else if (motive + inc < 0) {
      setCurrentMotive(motiveData.length - 1);
    } else setCurrentMotive(motive + inc);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h2>Motive & Modifiers</h2>
      <div className="card">
        <div className="type">{motiveFull?.name}</div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <p>
              Warships: {motiveFull.warships < 0 ? "" : "+"}
              {motiveFull.warships}
            </p>
            <p>
              Non-warships: {motiveFull.nonWarships < 0 ? "" : "+"}
              {motiveFull.nonWarships}
            </p>
            <p>
              Adventure Cards: {motiveFull.adventureCards < 0 ? "" : "+"}
              {motiveFull.adventureCards}
            </p>
            <p>
              Treasure: {motiveFull.treasure < 0 ? "" : "+"}
              {motiveFull.treasure}
            </p>
          </div>
          <div>
            <p>Liberation: x{motiveFull.liberation}</p>
            <p>Science Discovered: x{motiveFull.scienceDiscovered}</p>
            <p>Wonders Seen: x{motiveFull.wondersSeen}</p>
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <button
          onClick={() => {
            handleClick(-1);
          }}
        >
          ←
        </button>
        <button
          onClick={() => {
            console.log(motiveFull);
          }}
        >
          <p>{":)"}</p>
        </button>
        <button
          onClick={() => {
            handleClick(1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
