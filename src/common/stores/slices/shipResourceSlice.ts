// modules
import { StateCreator } from "zustand";

// types and interfaces
type shipResource = {
  id: number;
  name: string;
  value: number;
  statuses: string[];
  exertionDRM: number[];
  vp: Object[];
};
export interface ShipResourcesSliceInterface {
  nemo: shipResource;
  hull: shipResource;
  crew: shipResource;

  setNemoValue: (to: number) => void;
  setCrewValue: (to: number) => void;
  setHullValue: (to: number) => void;
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

  setNemoValue: (to) =>
    set((state) => ({
      nemo: {
        ...state.nemo,
        value: to,
      },
    })),
  setCrewValue: (to) =>
    set((state) => ({
      crew: {
        ...state.crew,
        value: to,
      },
    })),
  setHullValue: (to) =>
    set((state) => ({
      hull: {
        ...state.hull,
        value: to,
      },
    })),
});
