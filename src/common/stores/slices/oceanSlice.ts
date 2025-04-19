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
  oceanClickType: string;
  oceanClickOptions: (ocean | ship | string)[];
  clickedOcean: ocean | null;
  highlightClickOcean: boolean;
  attackingPlacedShip: ship | null;

  setOceans: (to: ocean[]) => void;
  setCurrentNautilusOceanName: (to: string) => void;
  setCurrentPlacementOcean: (to: string) => void;
  setNautilusMoved: (to: boolean) => void;
  setOceanClickType: (to: string) => void;
  setClickedOcean: (to: ocean | null) => void;
  setOceanClickOptions: (to: (ocean | ship | string)[]) => void;
  setHighlightClickOcean: (to: boolean) => void;
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
  oceanClickType: "",
  oceanClickOptions: [],
  clickedOcean: null,
  highlightClickOcean: false,
  attackingPlacedShip: null,

  setOceans: (to) => set(() => ({ oceans: to })),
  setCurrentNautilusOceanName: (to) =>
    set(() => ({ currentNautilusOceanName: to })),
  setCurrentPlacementOcean: (to) =>
    set(() => ({ currentPlacementOceanName: to })),
  setNautilusMoved: (to) => set(() => ({ nautilusMoved: to })),
  setOceanClickType: (to) => set(() => ({ oceanClickType: to })),
  setClickedOcean: (to) => set(() => ({ clickedOcean: to })),
  setOceanClickOptions: (to) => set(() => ({ oceanClickOptions: to })),
  setHighlightClickOcean: (to) => set(() => ({ highlightClickOcean: to })),
  setAttackingPlacedShip: (to) => set(() => ({ attackingPlacedShip: to })),
});
