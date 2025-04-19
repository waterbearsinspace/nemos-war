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
  adjacentOceans: adjacentOcean[];
  dieValue?: number;
  treasureAvailable: boolean;
  ships: (ship | string)[];
  adjacentLands?: land[];
  maxShips: number;
};

export interface OceanSliceInterface {
  oceans: ocean[];
  currentNautilusOceanName: string;
  currentPlacementOceanName: string;
  nautilusMoved: boolean;
  placementType: string;
  placementOptions: (ocean | ship | string)[];
  placementOcean: ocean | null;
  highlightPlacementOcean: boolean;
  attackingPlacedShip: ship | null;

  setOceans: (to: ocean[]) => void;
  setCurrentNautilusOceanName: (to: string) => void;
  setCurrentPlacementOcean: (to: string) => void;
  setNautilusMoved: (to: boolean) => void;
  setPlacementType: (to: string) => void;
  setPlacementOcean: (to: ocean | null) => void;
  setPlacementOptions: (to: (ocean | ship | string)[]) => void;
  setHighlightPlacementOcean: (to: boolean) => void;
  setAttackingPlacedShip: (to: ship | null) => void;
}

// data and constants
import oceanData from "../../data/oceans.json";

// slice
export const oceanSlice: StateCreator<OceanSliceInterface, []> = (set) => ({
  oceans: oceanData,
  currentNautilusOceanName: "Western Pacific",
  currentPlacementOceanName: "",
  nautilusMoved: false,
  placementType: "",
  placementOptions: [],
  placementOcean: null,
  highlightPlacementOcean: false,
  attackingPlacedShip: null,

  setOceans: (to) => set(() => ({ oceans: to })),
  setCurrentNautilusOceanName: (to) =>
    set(() => ({ currentNautilusOceanName: to })),
  setCurrentPlacementOcean: (to) =>
    set(() => ({ currentPlacementOceanName: to })),
  setNautilusMoved: (to) => set(() => ({ nautilusMoved: to })),
  setPlacementType: (to) => set(() => ({ placementType: to })),
  setPlacementOcean: (to) => set(() => ({ placementOcean: to })),
  setPlacementOptions: (to) => set(() => ({ placementOptions: to })),
  setHighlightPlacementOcean: (to) =>
    set(() => ({ highlightPlacementOcean: to })),
  setAttackingPlacedShip: (to) => set(() => ({ attackingPlacedShip: to })),
});
