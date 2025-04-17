// map spaces
// nautilus position
// map space statuses

// modules
import { StateCreator } from "zustand";
import { ship } from "./shipPoolsSlice";

// types and interfaces
type adjacentOcean = {
  name: string;
  placementOnly?: boolean;
};
type land = {
  name: string;
  hasUprisingCube: boolean;
};

export type ocean = {
  id: number;
  name: string;
  adjacentMovementOceans: adjacentOcean[];
  dieValue?: number;
  treasureAvailable: boolean;
  ships: (ship | string)[];
  adjacentLands?: land[];
  maxShips: number;
};

export interface OceanSliceInterface {
  oceans: ocean[];
  currentNautilusOceanName: string;
  currentPlacementOcean: string;
  nautilusMoved: boolean;

  setOceans: (to: ocean[]) => void;
  setCurrentNautilusOceanName: (to: string) => void;
  setCurrentPlacementOcean: (to: string) => void;
  setNautilusMoved: (to: boolean) => void;
}

// data and constants
import oceanData from "../../data/oceans.json";

// slice
export const oceanSlice: StateCreator<OceanSliceInterface, []> = (set) => ({
  oceans: oceanData,
  currentNautilusOceanName: "Western Pacific",
  currentPlacementOcean: "",
  nautilusMoved: false,

  setOceans: (to) => set(() => ({ oceans: to })),
  setCurrentNautilusOceanName: (to) =>
    set(() => ({ currentNautilusOceanName: to })),
  setCurrentPlacementOcean: (to) => set(() => ({ currentPlacementOcean: to })),
  setNautilusMoved: (to) => set(() => ({ nautilusMoved: to })),
});
