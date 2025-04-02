// modules
import { useEffect, useState } from "react";

// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// data and constants
import ships from "../../../common/data/ships.json";

// utils
import { getSubPhaseNumber, shuffleArray } from "../../../common/utils/utils";

export default function ShipPools() {
  let setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  let setCurrentShipPool = nemosStore((state) => state.setCurrentShipPool);

  let [displayText, setDisplayText] = useState("Setting up Ship Pools");

  let setupShipPool = () => {
    let starterShipPool = ships.filter(
      (ship) => ship.groupId == "A" || ship.groupId == "B"
    );
    let shuffledShips = shuffleArray(starterShipPool);
    setCurrentShipPool(shuffledShips);
  };

  useEffect(() => {
    setupShipPool();
    setSubPhase(getSubPhaseNumber("CONFIRM SETUP"));
  });

  return (
    <div>
      <h1 className="loading-text">
        <span>{displayText}</span>
        <div className="loader"></div>
      </h1>
    </div>
  );
}
