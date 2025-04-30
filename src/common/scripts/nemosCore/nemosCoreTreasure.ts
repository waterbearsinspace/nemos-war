import { nemosStore } from "../../stores/nemosStore";
import { shuffleArray } from "./nemosCoreUtils";

export function gainXTreasures(amount: number) {
  const treasureDrawPool = nemosStore.getState().treasureDrawPool;
  const setTreasureDrawPool = nemosStore.getState().setTreasureDrawPool;
  const setCurrentTreasures = nemosStore.getState().setCurrentTreasures;
  const currentTreasures = nemosStore.getState().currentTreasures;

  for (let i = 0; i < amount; i++) {
    const shuffledTreasures = shuffleArray(treasureDrawPool);
    const drawnTreasure = shuffledTreasures[0];
    const newTreasures = treasureDrawPool.filter(
      (treasure) => treasure != drawnTreasure
    );

    setCurrentTreasures(currentTreasures.concat([drawnTreasure]));
    setTreasureDrawPool(newTreasures);
  }
}
