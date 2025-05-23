// modules
import { StateCreator } from "zustand";

// types and interfaces
import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";
export interface DrawPileSliceInterface {
  drawPile: adventureCard[];

  setDrawPile: (to: adventureCard[]) => void;
}

// slice
export const drawPileSlice: StateCreator<DrawPileSliceInterface, []> = (
  set
) => ({
  drawPile: [],

  setDrawPile: (to) => set(() => ({ drawPile: to })),
});
