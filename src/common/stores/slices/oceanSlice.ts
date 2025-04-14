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
  setOceans: (newOceans: ocean[]) => void;
  currentNautilusOceanName: string;
  setCurrentNautilusOceanName: (newNautilusOceanName: string) => void;
  currentPlacementOcean: string;
  setCurrentPlacementOcean: (newOcean: string) => void;
  nautilusMoved: boolean;
  setNautilusMoved: (to: boolean) => void;
}

// data and constants
import oceanData from "../../data/oceans.json";

// slice
export const oceanSlice: StateCreator<OceanSliceInterface, []> = (set) => ({
  oceans: oceanData,
  setOceans: (newOceans) => set(() => ({ oceans: newOceans })),
  currentNautilusOceanName: "Western Pacific",
  setCurrentNautilusOceanName: (newNautilusOceanName) =>
    set(() => ({ currentNautilusOceanName: newNautilusOceanName })),
  currentPlacementOcean: "",
  setCurrentPlacementOcean: (newOcean) =>
    set(() => ({ currentPlacementOcean: newOcean })),
  nautilusMoved: false,
  setNautilusMoved: (to) => set(() => ({ nautilusMoved: to })),
});
