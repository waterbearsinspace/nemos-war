// modules
import { StateCreator } from "zustand";

// types
import { AdventureCardType } from "../../../components/Cards/AdventureCard.tsx/AdventureCard";

export interface DrawPileSliceInterface {
  drawPile: AdventureCardType[];
  setDrawPile: (newDrawPile: AdventureCardType[]) => void;
}

export const drawPileSlice: StateCreator<DrawPileSliceInterface, []> = (
  set
) => ({
  drawPile: [],
  setDrawPile: (newDrawPile) => set(() => ({ drawPile: newDrawPile })),
});

// draw pile

// draw card
