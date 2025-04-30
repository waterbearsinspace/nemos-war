// modules
import { StateCreator } from "zustand";

export interface PassAndFailePileSliceInterface {
  passPile: adventureCard[];
  failPile: adventureCard[];

  setPassPile: (to: adventureCard[]) => void;
  setFailPile: (to: adventureCard[]) => void;
}

// data and constants
import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";

// slice
export const passAndFailePileSlice: StateCreator<
  PassAndFailePileSliceInterface,
  []
> = (set) => ({
  passPile: [],
  failPile: [],

  setPassPile: (to) => set({ passPile: to }),
  setFailPile: (to) => set({ failPile: to }),
});
