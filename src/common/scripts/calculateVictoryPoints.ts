// types of victory points
// total victory points

// total
// warshipTotal - sunkenShipsSlice
//  for each warship in tonnage
//      modifiedValue = vp + motive.warships
//      warshipTotal = modifiedValue > 0 ? warshipTotal + modifiedValue : warshipTotal
// nonWarshipTotal - sunkenShipsSlice
//  for each non-warship in tonnage
//      modifiedValue = vp + motive.nonwarships
//      nonwarshipTotal = modifiedValue > 0 ? nonwarshipTotal + modifiedValue : nonwarshipsTotal
// adventureCardsTotal - passAndFailPilesSlice, upgradesSlice
//  for each card in passPile
//      modifiedValue = card + motive.adventureCards
//      adventureCardsTotal = modifiedValue > 0 ? adventureCardsTotal + modifiedValue : adventureCardsTotal
//  for each upgrade in upgradesSlice
//      if type is adventureCard
//          modifiedValue = upgrade + motive.adventureCards
//          adventureCardsTotal = modifiedValue > 0 ? adventureCardsTotal + modifiedValue : adventureTotal
// collectedTreasureTotal - treasureSlice
//  for each treasure in ownedTreasures:
//      modifiedValue = treasure + motive.treasure
//      collectedTreasureTotal = modifiedValue > 0 ? collectedTreasureTotal + modifiedValue : 0
// uprising - oceanSlice
// science - passAndFailPilesSlice, sunkenShipsSlice, shipResourcesSlice, characterResourcesSlice
// wonders - treasureSlice, upgradesSlice, passAndFailPilesSlice, shipResourcesSlice, sunkenShipsSlice
// surviving characters - characterResources, shipResourcesSlice, passAndFailPilesSlice
// scouring the seas - sunkenShipsSlice
// ship resources - shipResourcesSlice

export type vp = {
  warships?: number;
  nonWarships?: number;
  adventureCards?: number;
  treasures?: number;
  liberation?: number;
  scienceDiscovered?: number;
  wondersSeen?: number;
};
