// map spaces
// nautilus position
// map space statuses

// modules
import { StateCreator } from "zustand";
import { ship } from "./shipPoolsSlice";

// types and interfaces
type oceanMovement = {
  name: string;
  placementOnly?: boolean;
};
type land = {
  name: string;
  hasUprisingCube: boolean;
};

type ocean = {
  id: number;
  name: string;
  adjacentMovementOceans: oceanMovement[];
  dieValue?: number;
  treasureAvailable: boolean;
  ships: (ship | string)[];
  adjacentLands?: land[];
  maxShips: number;
};

export interface OceanSliceInterface {
  oceans: ocean[];
  setOceans: (newOceans: ocean[]) => void;
  currentNautilusOcean: string;
  setCurrentNautilusOcean: (newNautilusOcean: string) => void;
  currentPlacementOcean: string;
  setCurrentPlacementOcean: (newOcean: string) => void;
}

// data and constants
import oceanData from "../../data/oceans.json";

// slice
export const oceanSlice: StateCreator<OceanSliceInterface, []> = (set) => ({
  oceans: oceanData,
  setOceans: (newOceans) => set(() => ({ oceans: newOceans })),
  currentNautilusOcean: "Western Pacific",
  setCurrentNautilusOcean: (newNautilusOcean) =>
    set(() => ({ currentNautilusOcean: newNautilusOcean })),
  currentPlacementOcean: "",
  setCurrentPlacementOcean: (newOcean) =>
    set(() => ({ currentPlacementOcean: newOcean })),
});
