// modules
import { StateCreator } from "zustand";

// types and interfaces
import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";
export interface KeptCardsSliceInterface {
  keptCards: adventureCard[];
  // setKeptCards: void (operation, id) => number;
}

// slice
export const keptCardsSlice: StateCreator<
  KeptCardsSliceInterface,
  []
> = () => ({
  keptCards: [],
  // setKeptCards(operation, id)
  // if operation == add
  //    add id
  // else if operation == remove
  //    remove  id
  // return id
});
