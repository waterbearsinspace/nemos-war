// modules
import { useEffect, useState } from "react";

// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// data and constants
import ships from "../../../../common/data/ships.json";

// utils
import {
  getSubPhaseNumber,
  shuffleArray,
} from "../../../../common/utils/utils";
import { ship } from "../../../../common/stores/slices/shipPoolsSlice";

export default function ShipPools() {
  let setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  let currentShipPool = nemosStore((state) => state.currentShipPool);
  let setCurrentShipPool = nemosStore((state) => state.setCurrentShipPool);
  let oceans = nemosStore((state) => state.oceans);
  let setOceans = nemosStore((state) => state.setOceans);

  let [displayText, setDisplayText] = useState("Setting up Ship Pools");

  function setupShipPool() {
    let starterShipPool = ships.filter(
      (ship) => ship.groupId == "A" || ship.groupId == "B"
    );
    let shuffledShips = shuffleArray(starterShipPool);
    setCurrentShipPool(shuffledShips);
  }

  let setupOceans = () => {
    function placeShips(oceanName: string, numShips: number) {
      let hiddenShips: string[] = [];
      for (let i = 0; i < numShips; i++) {
        hiddenShips.push("Hidden Ship");
      }
      let newOceans = oceans;
      newOceans.find((ocean) => ocean.name == oceanName)!.ships = hiddenShips;
      setOceans(newOceans);
    }

    oceans.map((ocean) => {
      switch (ocean.name) {
        case "Western Pacific":
          placeShips(ocean.name, 2);
          break;
        case "Eastern Pacific":
          placeShips(ocean.name, 1);
          break;
        case "North Atlantic":
          placeShips(ocean.name, 2);
          break;
        case "South Atlantic":
          placeShips(ocean.name, 1);
          break;
        case "European Seas":
          placeShips(ocean.name, 3);
          break;
        case "Indian Ocean":
          placeShips(ocean.name, 1);
          break;
        case "South Pacific":
          placeShips(ocean.name, 1);
          break;
        case "Pacific Coast":
          placeShips(ocean.name, 1);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    setupShipPool();
    setupOceans();
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
