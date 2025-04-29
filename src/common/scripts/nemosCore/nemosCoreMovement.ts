import { nemosStore } from "../../stores/nemosStore";
import { ocean } from "../../stores/slices/oceanSlice";

// ============================
// MOVEMENT
// ============================

export function handleMovementScreenOptions() {
  const oceans = nemosStore.getState().oceans;
  const nautilusOceanName = nemosStore.getState().currentNautilusOceanName;
  const nautilusOcean = oceans.find((ocean) => {
    return ocean.name == nautilusOceanName;
  });
  const nautilusAdjancentOceanNames = nautilusOcean!.adjacentOceans.map(
    (ocean) => {
      if (!ocean.placementOnly) {
        return ocean.name;
      }
    }
  );
  const nautilusAdjancentOceans = oceans.filter((ocean) => {
    return nautilusAdjancentOceanNames.includes(ocean.name);
  });
  const nautilusMoved = nemosStore.getState().nautilusMoved;
  const currentUpgrades = nemosStore.getState().currentUpgrades;
  const hasHydroMovement = currentUpgrades.find((upgrade) => {
    return upgrade.name == "Hydro Drive";
  });
  const hydroMoved = nemosStore.getState().hydroMoved;
  const setOceanClickOptions = nemosStore.getState().setOceanClickOptions;

  // if nautlius hasn't moved yet
  if (!nautilusMoved) {
    // update options
    setOceanClickOptions(nautilusAdjancentOceans);
  } else if (nautilusMoved) {
    // if nautilus doesn't have hydro move
    if (!hasHydroMovement) {
      // hide options
      setOceanClickOptions([]);
    }
    // else if nautilus has hydro movement
    else if (hasHydroMovement) {
      // update options
      setOceanClickOptions(nautilusAdjancentOceans);
      // else if nautilus hydro moved
      if (!hydroMoved) {
        // do nothing
      } else if (hydroMoved) {
        // hide options
        setOceanClickOptions([]);
      }
    }
  }
}

export function moveNautilus(ocean: ocean) {
  const nautilusMoved = nemosStore.getState().nautilusMoved;
  const setNautilusMoved = nemosStore.getState().setNautilusMoved;
  const currentUpgrades = nemosStore.getState().currentUpgrades;
  const hasHydroMovement = currentUpgrades.find((upgrade) => {
    return upgrade.name == "Hydro Drive";
  });
  const hydroMoved = nemosStore.getState().hydroMoved;
  const setHydroMoved = nemosStore.getState().setHydroMoved;

  const setNautilusOcean = nemosStore.getState().setCurrentNautilusOceanName;

  // if nautlius hasn't moved yet
  if (!nautilusMoved) {
    // move nautilus to ocean
    setNautilusOcean(ocean.name);
    // set movement true
    setNautilusMoved(true);
  }
  // else if nautilus has moved
  else if (nautilusMoved) {
    // if has hydro movement
    if (hasHydroMovement) {
      // if nautilus hasn't hydro moved yet
      if (!hydroMoved) {
        // move nautilus to ocean
        setNautilusOcean(ocean.name);
        // set hydro moved true
        setHydroMoved(true);
      }
    }
  }
  handleMovementScreenOptions();
}
