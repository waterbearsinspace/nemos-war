// modules
import { StateCreator } from "zustand";

// types and interfaces
import { AdventureCardType } from "../../../components/Cards/AdventureCard.tsx/AdventureCard";
export interface DrawPileSliceInterface {
  drawPile: AdventureCardType[];
  setDrawPile: (newDrawPile: AdventureCardType[]) => void;
}

// slice
export const drawPileSlice: StateCreator<DrawPileSliceInterface, []> = (
  set
) => ({
  drawPile: [],

  setDrawPile: (newDrawPile) => set(() => ({ drawPile: newDrawPile })),
});
