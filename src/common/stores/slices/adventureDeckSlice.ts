// modules
import { StateCreator } from "zustand";

// types and interfaces
import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";
export interface AdventureDeckSliceInterface {
  adventureDeck: adventureCard[];
  adventureDeckTreasuresAvailable: number;
  setAdventureDeck: (newDrawPile: adventureCard[]) => void;
  adjustAdventureDeckTreasures: (by: number) => void;
}

// slice
export const adventureDeckSlice: StateCreator<
  AdventureDeckSliceInterface,
  []
> = (set) => ({
  adventureDeck: [],
  adventureDeckTreasuresAvailable: 1,

  setAdventureDeck: (newAdventureDeck) =>
    set(() => ({ adventureDeck: newAdventureDeck })),

  adjustAdventureDeckTreasures: (by) =>
    set((state) => ({
      adventureDeckTreasuresAvailable:
        state.adventureDeckTreasuresAvailable + by,
    })),
});
