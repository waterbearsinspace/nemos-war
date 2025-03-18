// constants
import { gamePhases, gameSubPhases } from "../stores/slices/gamePhaseSlice";

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
