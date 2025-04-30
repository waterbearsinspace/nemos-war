import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { shuffleArray } from "../../../../common/scripts/nemosCore/nemosCoreUtils";

import "./Actions.css";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";
import TableAndTest from "../../../Dice/TableAndTest";

export default function Search() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const treasureDrawPool = nemosStore((state) => state.treasureDrawPool);
  const setTreasureDrawPool = nemosStore((state) => state.setTreasureDrawPool);
  const setCurrentTreasures = nemosStore((state) => state.setCurrentTreasures);
  const currentTreasures = nemosStore((state) => state.currentTreasures);
  const oceans = nemosStore((state) => state.oceans);
  const setOceans = nemosStore((state) => state.setOceans);
  const resolving = nemosStore((state) => state.resolving);
  const setResolving = nemosStore((state) => state.setResolving);
  const resolvingSelected = nemosStore((state) => state.resolvingSelected);
  const upgrades = nemosStore((state) => state.currentUpgrades);
  const hasArcaneLibrary = upgrades.find((upgrade) => {
    return upgrade.name == "Arcane Library";
  });

  const nemoExertionValue =
    nemosStore.getState().nemo.exertionDRM[nemosStore.getState().nemo.value];
  const crewExertionValue =
    nemosStore.getState().crew.exertionDRM[nemosStore.getState().crew.value];
  const hullExertionValue =
    nemosStore.getState().hull.exertionDRM[nemosStore.getState().hull.value];
  const nemoExerted = diceStore.getState().exertingNemo;
  const crewExerted = diceStore.getState().exertingCrew;
  const hullExerted = diceStore.getState().exertingHull;
  const exertionDRM =
    (nemoExerted ? nemoExertionValue : 0) +
    (crewExerted ? crewExertionValue : 0) +
    (hullExerted ? hullExertionValue : 0);

  const activeDice = ["w1", "w2"];
  const activeDiceArray = diceStore((state) => state.dice).filter((die) =>
    activeDice.includes(die.id)
  );
  const sumRolled = activeDiceArray.reduce((sum, die) => sum + die.value, 0);
  const currentOcean = nemosStore((store) =>
    store.oceans.find((ocean) => ocean.name == store.currentNautilusOceanName)
  )!;
  const currentOceanShips = currentOcean.ships.filter(
    (ship) => typeof ship != "string"
  );
  const revealedCount = currentOceanShips.length;

  const {
    adjustCrewBy,
    adjustHullBy,
    adjustNotorietyBy,
    setSubPhase,
    applyFailedTestPenalty,
  } = useNemosCore();

  const finalValue =
    sumRolled + exertionDRM + (hasArcaneLibrary ? 1 : 0) + revealedCount;

  const handleResolve = () => {
    setResolving(true);
  };

  const handleContinue = () => {
    const shuffledTreasures = shuffleArray(treasureDrawPool);
    const firstDrawnTreasure = shuffledTreasures[0];
    const secondDrawnTreasure = shuffledTreasures[1];
    const bothDrawnTreasures = [firstDrawnTreasure, secondDrawnTreasure];
    const newTreasuresFirst = treasureDrawPool.filter(
      (treasure) => treasure != firstDrawnTreasure
    );
    const newTreasuresSecond = newTreasuresFirst.filter(
      (treasure) => treasure != secondDrawnTreasure
    );
    const currentOceanIndex = oceans.findIndex(
      (ocean) => ocean == currentOcean
    );

    // apply result
    if (finalValue <= 2) {
      adjustCrewBy(-1);
      adjustHullBy(-1);
      applyFailedTestPenalty();
    } else if (finalValue <= 6) {
      if (resolvingSelected.includes("crew")) adjustCrewBy(-1);
      else if (resolvingSelected.includes("hull")) adjustHullBy(-1);
      applyFailedTestPenalty();
    } else if (finalValue <= 8) {
      setCurrentTreasures(currentTreasures.concat([firstDrawnTreasure]));
      setTreasureDrawPool(newTreasuresFirst);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
      adjustNotorietyBy(1);
    } else if (finalValue <= 11) {
      setCurrentTreasures(currentTreasures.concat([firstDrawnTreasure]));
      setTreasureDrawPool(newTreasuresFirst);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
    } else if (finalValue >= 12) {
      setCurrentTreasures(currentTreasures.concat(bothDrawnTreasures));
      setTreasureDrawPool(newTreasuresSecond);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
    }
    // adjust treasure
    setDoneRolling(false);
    setSubPhase("ACTION SELECT");
  };

  console.log(finalValue);

  const needToResolve = finalValue > 2 && finalValue <= 6;

  return (
    <>
      <TableAndTest id="Search" />

      {doneRolling && !needToResolve && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}
      {doneRolling && needToResolve && !resolving && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleResolve}>
            Continue
          </button>
        </div>
      )}
      {doneRolling && needToResolve && resolvingSelected.length > 0 && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}
    </>
  );
}
