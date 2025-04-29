import { nemosStore } from "../../stores/nemosStore";
import { ocean } from "../../stores/slices/oceanSlice";
import { ship } from "../../stores/slices/shipPoolsSlice";

// ============================
// SHIPS
// ============================

export function drawShip() {
  const shipPool = nemosStore.getState().currentShipPool;
  const setShipPool = nemosStore.getState().setCurrentShipPool;

  // draw ship
  const drawnShip = shipPool[0];

  // remove drawn ship from ship pool
  const newShipPool = shipPool.filter((ship, index) => {
    if (index != 0) return ship;
  });
  setShipPool(newShipPool);

  // return drawn ship
  return drawnShip;
}

export function revealHiddenShipInOcean(hiddenShip: string, shipOcean: ocean) {
  const oceans = nemosStore.getState().oceans;
  const oceanShips = shipOcean.ships;
  const setOceans = nemosStore.getState().setOceans;
  const setAttackTarget = nemosStore.getState().setAttackTarget;

  const indexOfHiddenShip = oceanShips.indexOf(hiddenShip);

  const drawnShip = drawShip();

  const newShips = oceanShips.map((ship, index) => {
    return index == indexOfHiddenShip ? drawnShip : ship;
  });

  setAttackTarget(drawnShip);

  setOceans(
    oceans.map((ocean) => {
      return ocean == shipOcean ? { ...shipOcean, ships: newShips } : ocean;
    })
  );
}

export function selectShipInOcean(thisShip: ship) {
  const setAttackTarget = nemosStore.getState().setAttackTarget;

  setAttackTarget(thisShip);
}
