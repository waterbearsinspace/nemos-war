// modules
import { StateCreator } from "zustand";

// types
import { AdventureCardType } from "../../../components/Cards/AdventureCard.tsx/AdventureCard";

export interface AdventureDeckSliceInterface {
  adventureDeck: AdventureCardType[];
  setAdventureDeck: (newDrawPile: AdventureCardType[]) => void;
  adventureDeckTreasuresAvailable: number;
}

export const adventureDeckSlice: StateCreator<
  AdventureDeckSliceInterface,
  []
> = (set) => ({
  adventureDeck: [],
  setAdventureDeck: (newAdventureDeck) =>
    set(() => ({ adventureDeck: newAdventureDeck })),
  adventureDeckTreasuresAvailable: 1,
});
