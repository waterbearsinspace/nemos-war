// modules
import { StateCreator } from "zustand";

// types and interfaces
import { AdventureCardType } from "../../../components/Cards/AdventureCard/AdventureCard";
export interface KeptCardsSliceInterface {
  keptCards: AdventureCardType[];
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
