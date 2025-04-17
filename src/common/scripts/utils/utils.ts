// types and interfaces
import { ship } from "../../stores/slices/shipPoolsSlice";

// constants
import { gamePhases, gameSubPhases } from "../../stores/slices/gamePhaseSlice";

// shuffle array
// credit to geeksforgeeks for fisher-yates algorithm implementation
export function shuffleArray(arr: any) {
  let newArray = arr;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getPhaseNumber(phaseName: string) {
  const phases = Object.entries(gamePhases);
  let foundPhase = phases.find((phasePair) => {
    return phasePair[1] == phaseName;
  });
  return Number(foundPhase![0]);
}

export function getSubPhaseNumber(phaseName: string) {
  const subPhases = Object.entries(gameSubPhases);
  let foundPhase = subPhases.find((phasePair) => {
    return phasePair[1] == phaseName;
  });
  return Number(foundPhase![0]);
}

export function getFlippedShip(ship: ship) {
  const flippedShip = {
    id: ship.id,
    name: ship.flipName ? ship.flipName : ship.name,
    attackStrength: ship.flipAttackStrength
      ? ship.flipAttackStrength
      : ship.attackStrength,
    defenseStrength: ship.flipDefenseStrength
      ? ship.flipDefenseStrength
      : ship.defenseStrength,
    notoriety: ship.flipNotoriety ? ship.flipNotoriety : ship.notoriety,
    groupId: ship.flipGroupId ? ship.flipGroupId : ship.groupId,
    nationality: ship.flipNationality ? ship.flipNationality : ship.nationality,
    shipClass: ship.flipShipClass ? ship.flipShipClass : ship.shipClass,
    vp: ship.flipVp ? ship.flipVp : ship.vp,
    flipName: ship.name,
    flipAttackStrength: ship.attackStrength,
    flipDefenseStrength: ship.defenseStrength,
    flipNotoriety: ship.notoriety,
    flipGroupId: ship.groupId,
    flipNationality: ship.nationality,
    flipShipClass: ship.shipClass,
    flipVp: ship.vp,
    flipped: true,
  };

  return flippedShip;
}
