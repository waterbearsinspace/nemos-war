// modules
import { StateCreator } from "zustand";

// types
import { AdventureCardType } from "../../../components/Cards/AdventureCard.tsx/AdventureCard";

export interface AdventureDeckSliceInterface {
  adventureDeck: AdventureCardType[];
  adventureDeckTreasuresAvailable: number;
  setAdventureDeck: (newDrawPile: AdventureCardType[]) => void;
}

export const adventureDeckSlice: StateCreator<
  AdventureDeckSliceInterface,
  []
> = (set) => ({
  adventureDeck: [],
  adventureDeckTreasuresAvailable: 1,

  setAdventureDeck: (newAdventureDeck) =>
    set(() => ({ adventureDeck: newAdventureDeck })),
});
