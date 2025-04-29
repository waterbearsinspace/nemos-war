import { nemosStore } from "../../stores/nemosStore";
import { ship } from "../../stores/slices/shipPoolsSlice";
import { resetAttackOptions } from "./nemosCoreResets";

// ============================
// COMBAT
// ============================

// handle display of attack options
export function updateAttackOptions() {
  const setOceanClickType = nemosStore.getState().setOceanClickType;
  const setOceanClickOptions = nemosStore.getState().setOceanClickOptions;
  const attackTarget = nemosStore.getState().attackTarget;

  // all oceans
  const oceans = nemosStore.getState().oceans;
  // name of nautilus ocean
  const nautilusOceanName = nemosStore.getState().currentNautilusOceanName;
  // nautilus ocean
  const nautilusOcean = oceans.find((ocean) => {
    return ocean.name == nautilusOceanName;
  })!;
  // nautilus ocean ships
  const nautilusOceanShips = nautilusOcean?.ships;

  if (!attackTarget) {
    setOceanClickType("Select Target");
    setOceanClickOptions(nautilusOceanShips);
  } else resetAttackOptions();
}

export function addTonnage(ocean: string) {
  const westernPacificTonnage = nemosStore.getState().westernPacificTonnage;
  const easternPacificTonnage = nemosStore.getState().easternPacificTonnage;
  const northAtlanticTonnage = nemosStore.getState().northAtlanticTonnage;
  const southAtlanticTonnage = nemosStore.getState().southAtlanticTonnage;
  const europeanSeasTonnage = nemosStore.getState().europeanSeasTonnage;
  const indianOceanTonnage = nemosStore.getState().indianOceanTonnage;
  const setWesternPacificTonnage =
    nemosStore.getState().setWesternPacificTonnage;
  const setEasternPacificTonnage =
    nemosStore.getState().setEasternPacificTonnage;
  const setNorthAtlanticTonnage = nemosStore.getState().setNorthAtlanticTonnage;
  const setSouthAtlanticTonnage = nemosStore.getState().setSouthAtlanticTonnage;
  const setEuropeanSeasTonnage = nemosStore.getState().setEuropeanSeasTonnage;
  const setIndianOceanTonnage = nemosStore.getState().setIndianOceanTonnage;

  const attackTarget = nemosStore.getState().attackTarget;

  switch (ocean) {
    case "Western Pacific":
      setWesternPacificTonnage([...westernPacificTonnage, attackTarget!]);
      break;
    case "Eastern Pacific":
      setEasternPacificTonnage([...easternPacificTonnage, attackTarget!]);
      break;
    case "North Atlantic":
      setNorthAtlanticTonnage([...northAtlanticTonnage, attackTarget!]);
      break;
    case "South Atlantic":
      setSouthAtlanticTonnage([...southAtlanticTonnage, attackTarget!]);
      break;
    case "European Seas":
      setEuropeanSeasTonnage([...europeanSeasTonnage, attackTarget!]);
      break;
    case "Indian Ocean":
      setIndianOceanTonnage([...indianOceanTonnage, attackTarget!]);
      break;
  }
}

export function addSalvage(thisShip: ship) {
  const salvage = nemosStore.getState().salvage;
  const setSalvage = nemosStore.getState().setSalvage;
  const salvagedShips = nemosStore.getState().salvagedShips;
  const setSalvagedShips = nemosStore.getState().setSalvagedShips;

  setSalvage(salvage + 1);
  setSalvagedShips([...salvagedShips, thisShip]);
}
