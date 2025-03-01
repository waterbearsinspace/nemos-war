// gameState
import { gameStateStore } from "../../common/stores/gameStateStore";

// data
import motiveData from "../../common/data/motives.json";

export default function MotiveSelector() {
  const motive = gameStateStore((state) => state.currentMotive);
  const setCurrentMotive = gameStateStore((state) => state.setCurrentMotive);

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
        <div className="type">{motiveData[motive]?.name}</div>
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
              Warships: {motiveData[motive].warships < 0 ? "" : "+"}
              {motiveData[motive].warships}
            </p>
            <p>Non-warships: +{motiveData[motive].non_warships}</p>
            <p>Adventure Cards: +{motiveData[motive].adventure_cards}</p>
            <p>Treasure: +{motiveData[motive].treasure}</p>
          </div>
          <div>
            <p>Liberation: x{motiveData[motive].liberation}</p>
            <p>Science Discovered: x{motiveData[motive].science_discovered}</p>
            <p>Wonders Seen: x{motiveData[motive].wonders_seen}</p>
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
            handleClick(1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
