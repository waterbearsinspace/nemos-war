import { nemosStore } from "../../stores/nemosStore";

import scorableCardData from "../../data/scorableCards.json";

export const getScore = () => {
  const motive = nemosStore.getState().currentMotive;

  function getModifiedScore(score: number, modifier: number) {
    if (score + modifier >= 0) return score + modifier;
    else return 0;
  }

  // ============================
  // SHIPS
  // ============================
  const westernPacificTonnage = nemosStore.getState().westernPacificTonnage;
  const easternPacificTonnage = nemosStore.getState().easternPacificTonnage;
  const northAtlanticTonnage = nemosStore.getState().northAtlanticTonnage;
  const southAtlanticTonnage = nemosStore.getState().southAtlanticTonnage;
  const europeanSeasTonnage = nemosStore.getState().europeanSeasTonnage;
  const indianOceanTonnage = nemosStore.getState().indianOceanTonnage;

  const allTonnageTracks = [
    westernPacificTonnage,
    easternPacificTonnage,
    northAtlanticTonnage,
    southAtlanticTonnage,
    europeanSeasTonnage,
    indianOceanTonnage,
  ];

  const allTonnageShips = [
    ...westernPacificTonnage,
    ...easternPacificTonnage,
    ...northAtlanticTonnage,
    ...southAtlanticTonnage,
    ...europeanSeasTonnage,
    ...indianOceanTonnage,
  ];

  const sunkenWarshipScore = allTonnageShips.reduce(
    (score, ship) =>
      score +
      (ship.vp?.warships
        ? getModifiedScore(ship.vp.warships, motive.warships)
        : 0),
    0
  );

  const sunkenNonWarshipScore = allTonnageShips.reduce(
    (score, ship) =>
      score +
      (ship.vp?.nonWarships
        ? getModifiedScore(ship.vp.nonWarships, motive.nonWarships)
        : 0),
    0
  );

  const tonnageLengths = allTonnageTracks.map((tonnage) => {
    return tonnage.length;
  });

  const wonderShipsSunken = allTonnageShips.reduce(
    (score, ship) => score + (ship.vp?.wondersSeen ?? 0) * motive.wondersSeen,
    0
  );

  const scourgeOfTheSeasPossibleScores = [8, 12, 17, 23, 30, 40];
  const scourgeOfTheSeasAmountToIndex = Math.min(...tonnageLengths) - 1;
  const scourgeOfTheSeasScore =
    scourgeOfTheSeasPossibleScores[scourgeOfTheSeasAmountToIndex] ?? 0;

  // ============================
  // CARDS
  // ============================
  const passPile = nemosStore.getState().passPile;
  const currentUpgrades = nemosStore.getState().currentUpgrades;

  const scorableCardIds = scorableCardData.map((card) => {
    return card.id;
  });

  const passedCardIds = passPile.map((card) => {
    if (scorableCardIds.includes(card.id)) {
      return card.id;
    }
  });

  const passedCardsAdventureScore = scorableCardIds.reduce(
    (score, id) =>
      score +
      (passedCardIds.includes(id)
        ? getModifiedScore(
            scorableCardData.find((card) => {
              return card.id == id;
            })!.vp.adventureCards ?? 0,
            motive.adventureCards
          )
        : 0),
    0
  );
  const passedCardsScienceScore = scorableCardIds.reduce(
    (score, id) =>
      score +
      (passedCardIds.includes(id)
        ? scorableCardData.find((card) => {
            return card.id == id;
          })!.vp.scienceDiscovered ?? 0
        : 0) *
        motive.scienceDiscovered,
    0
  );

  const passedCardsWondersScore = scorableCardIds.reduce(
    (score, id) =>
      score +
      (passedCardIds.includes(id)
        ? (scorableCardData.find((card) => {
            return card.id == id;
          })!.vp.wondersSeen ?? 0) * motive.wondersSeen
        : 0),
    0
  );

  const passedCardsCharacterScore = scorableCardIds.reduce(
    (score, id) =>
      score +
      (passedCardIds.includes(id)
        ? scorableCardData.find((card) => {
            return card.id == id;
          })!.vp.charactersRemaining ?? 0
        : 0),
    0
  );

  // ============================
  // TREASURE
  // ============================
  const currentTreasures = nemosStore.getState().currentTreasures;

  const treasureTreasureScore =
    currentTreasures.length > 0
      ? currentTreasures?.reduce(
          (score, treasure) =>
            score +
            getModifiedScore(treasure.vp?.treasures ?? 0, motive.treasure),
          0
        )
      : 0;

  const wonderTreasureScore =
    currentTreasures.length > 0
      ? currentTreasures.reduce(
          (score, treasure) =>
            score + (treasure.vp?.wondersSeen ?? 0) * motive.wondersSeen,
          0
        )
      : 0;

  // ============================
  // UPGRADES
  // ============================
  const adventureUpgradesScore = currentUpgrades.reduce(
    (score, upgrade) =>
      score +
      getModifiedScore(upgrade.vp?.adventureCards ?? 0, motive.adventureCards),
    0
  );
  const scienceUpgradesScore = currentUpgrades.reduce(
    (score, upgrade) =>
      score + (upgrade.vp?.scienceDiscovered ?? 0) * motive.scienceDiscovered,
    0
  );
  const wonderUpgradesScore = currentUpgrades.reduce(
    (score, upgrade) =>
      score + (upgrade.vp?.wondersSeen ?? 0) * motive.wondersSeen,
    0
  );

  // ============================
  // SCIENCE
  // ============================
  const hull = nemosStore.getState().hull;
  const professorAronnax = nemosStore
    .getState()
    .characterResources.find((character) => {
      return character.name == "Professor Aronnax";
    })!;

  const scienceHullScore =
    (hull.vp[hull.value].scienceDiscovered ?? 0) * motive.scienceDiscovered;
  const scienceAronnaxScore =
    (!professorAronnax.sacrificed ? professorAronnax.survivingCharacterVp : 0) *
    motive.scienceDiscovered;

  // ============================
  // WONDERS SEEN
  // ============================
  const nemo = nemosStore.getState().nemo;

  const wondersNemoScore =
    (nemo.vp[nemo.value].wondersSeen ?? 0) * motive.wondersSeen;

  // ============================
  // SURVIVING CHARACTER BONUS
  // ============================
  const crew = nemosStore.getState().crew;

  const charcterCrewScore = crew.vp[crew.value].survivingCharacter ?? 0;

  // ============================
  // SURVIVING CHARACTER BONUS
  // ============================
  const penaltyNemo = nemo.vp[nemo.value].shipResourcesPenalty ?? 0;
  const penaltyCrew = crew.vp[crew.value].shipResourcesPenalty ?? 0;
  const penaltyHull = hull.vp[hull.value].shipResourcesPenalty ?? 0;

  return {
    warships: sunkenWarshipScore,
    nonWarships: sunkenNonWarshipScore,

    adventurePassedCardsScore: passedCardsAdventureScore,
    adventureUpgradesScore: adventureUpgradesScore,

    treasureScore: treasureTreasureScore,

    sciencePassedCardsScore: passedCardsScienceScore,
    scienceUpgradesScore: scienceUpgradesScore,
    scienceHullScore: scienceHullScore,
    scienceAronnaxScore: scienceAronnaxScore,

    wonderTreasureScore: wonderTreasureScore,
    wonderUpgradesScore: wonderUpgradesScore,
    wondersPassedCardsScore: passedCardsWondersScore,
    wondersNemoScore: wondersNemoScore,
    wonderShipsSunken: wonderShipsSunken,

    charcterCrewScore: charcterCrewScore,
    characterPassedCardScore: passedCardsCharacterScore,

    scourgeOfTheSeas: scourgeOfTheSeasScore,

    penaltyNemo: penaltyNemo,
    penaltyCrew: penaltyCrew,
    penaltyHull: penaltyHull,
  };
};

export const getTotalScore = () => {
  const scoreValues = Object.values(getScore());
  const scoreSum =
    scoreValues.reduce((sum, score) => sum + (score ? score : 0), 0) -
    getScore().penaltyNemo * 2 -
    getScore().penaltyCrew * 2 -
    getScore().penaltyHull * 2;

  return scoreSum;
};
