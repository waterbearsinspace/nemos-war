// modules
import { useEffect, useState } from "react";

// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// data and constants
import ships from "../../../common/data/ships.json";

// utils
import { getSubPhaseNumber, shuffleArray } from "../../../common/utils/utils";

export default function ShipPools() {
  let loadingSeconds = nemosStore((state) =>
    state.debugUseLoading ? state.debugLoading : 1.5
  );
  let setSubPhase = nemosStore((state) => state.setSubPhase);
  let setCurrentShipPool = nemosStore((state) => state.setCurrentShipPool);

  let [displayText, setDisplayText] = useState("Setting up Ship Pools");
  let [loading, setLoading] = useState(true);

  const handleContinue = () => {
    setSubPhase(getSubPhaseNumber("CONFIRM SETUP"));
  };

  let setupShipPool = () => {
    let starterShipPool = ships.filter(
      (ship) => ship.groupId == "A" || ship.groupId == "B"
    );
    let shuffledShips = shuffleArray(starterShipPool);
    setCurrentShipPool(shuffledShips);

    setTimeout(() => {
      setDisplayText("Done!");
      setLoading(false);
    }, loadingSeconds * 1000);
  };

  useEffect(() => {
    setupShipPool();
  });

  return (
    <div>
      <h1 className="loading-text">
        <span>{displayText}</span>
        <div className={loading ? "loader" : ""}></div>
      </h1>
      {!loading && <button onClick={handleContinue}>Continue</button>}
    </div>
  );
}
