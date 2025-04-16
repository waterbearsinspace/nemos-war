// modules
import { useEffect } from "react";

// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// data and constants
import shipData from "../../../../common/data/ships.json";
import treasures from "../../../../common/data/treasures.json";

// types and interfaces
import { treasure } from "../../../../common/stores/slices/treasuresSlice";

// utils
import {
  getSubPhaseNumber,
  shuffleArray,
} from "../../../../common/utils/utils";

export default function ShipPools() {
  // store selectors
  let setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  let setCurrentShipPool = nemosStore((state) => state.setCurrentShipPool);
  let setUnusedShipPool = nemosStore((state) => state.setUnusedShipPool);
  let setTreasureDrawlPool = nemosStore((state) => state.setTreasureDrawPool);
  let oceans = nemosStore((state) => state.oceans);
  let setOceans = nemosStore((state) => state.setOceans);

  function setupShipPool() {
    let starterShipPool = shipData.filter(
      (ship) => ship.groupId == "A" || ship.groupId == "B"
    );
    let unusedShipPool = shipData.filter(
      (ship) => ship.groupId != "A" && ship.groupId != "B"
    );
    let shuffledShips = shuffleArray(starterShipPool);
    setCurrentShipPool(shuffledShips);
    setUnusedShipPool(unusedShipPool);
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

  function getStartingTreasureDrawPool() {
    let startingTreasureDrawPool: treasure[] = [];

    treasures.map((treasure: any) => {
      for (let i = 0; i < (treasure.amount ? treasure.amount : 1); i++) {
        startingTreasureDrawPool.push({
          id: treasure.id,
          type: treasure.type,
          name: treasure?.name,
          vp: treasure?.vp,
        });
      }
    });

    let shuffledTreasure = shuffleArray(startingTreasureDrawPool);

    setTreasureDrawlPool(shuffledTreasure);
  }

  useEffect(() => {
    setupShipPool();
    setupOceans();
    getStartingTreasureDrawPool();
    setSubPhase(getSubPhaseNumber("CONFIRM SETUP"));
  });

  return (
    <div>
      <h1 className="loading-text">
        <span>Setting up Ship Pools</span>
        <div className="loader"></div>
      </h1>
    </div>
  );
}
