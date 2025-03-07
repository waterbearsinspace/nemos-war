// modules
import { StateCreator } from "zustand";

// types and interfaces
type ShipResource = {
  id: number;
  name: string;
  value: number;
  statuses: string[];
  exertionDRM: number[];
  vp: Object[];
};
export interface ShipResourcesSliceInterface {
  nemo: ShipResource;
  hull: ShipResource;
  crew: ShipResource;
  adjustNemoValue: (by: number) => void;
  adjustCrewValue: (by: number) => void;
  adjustHullValue: (by: number) => void;
}

// data and constants
import shipResourceData from "../../data/shipResources.json";
let nemoData = shipResourceData[0];
let crewData = shipResourceData[1];
let hullData = shipResourceData[2];
const nemoMax = 6;
const crewMax = 10;
const hullMax = 10;

// slice
export const shipResourceSlice: StateCreator<
  ShipResourcesSliceInterface,
  []
> = (set) => ({
  nemo: { ...nemoData, value: nemoMax },
  crew: { ...crewData, value: crewMax },
  hull: { ...hullData, value: hullMax },

  adjustNemoValue: (by) =>
    set((state) => ({
      nemo: {
        ...state.nemo,
        value:
          state.nemo.value + by > nemoMax ? nemoMax : state.nemo.value + by,
      },
    })),
  adjustCrewValue: (by) =>
    set((state) => ({
      crew: {
        ...state.crew,
        value:
          state.crew.value + by > crewMax ? crewMax : state.crew.value + by,
      },
    })),
  adjustHullValue: (by) =>
    set((state) => ({
      hull: {
        ...state.hull,
        value:
          state.hull.value + by > hullMax ? hullMax : state.hull.value + by,
      },
    })),
});
