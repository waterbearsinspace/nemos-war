// modules
import { StateCreator } from "zustand";

// types and interfaces
import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";
export interface KeptCardsSliceInterface {
  keptCards: adventureCard[];

  setKeptCards: (to: adventureCard[]) => void;
}

// slice
export const keptCardsSlice: StateCreator<KeptCardsSliceInterface, []> = (
  set
) => ({
  keptCards: [],

  setKeptCards: (to) => set(() => ({ keptCards: to })),
});
