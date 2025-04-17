// tonnage

// salvage

// modules
import { StateCreator } from "zustand";

// types and interfaces
type tonnage = {
  westernPacific: number;
  easternPacific: number;
  northAtlantic: number;
  southAtlantic: number;
  europeanSeas: number;
  indianOcean: number;
};
export interface SunkenShipsSliceInterface {
  tonnage: tonnage;
  setTonnage: (to: tonnage) => void;

  salvage: number;
  setSalvage: (to: number) => void;
}

export const sunkenShipsSlice: StateCreator<SunkenShipsSliceInterface, []> = (
  set
) => ({
  tonnage: {
    westernPacific: 0,
    easternPacific: 0,
    northAtlantic: 0,
    southAtlantic: 0,
    europeanSeas: 0,
    indianOcean: 0,
  },
  salvage: 0,

  setTonnage: (to) => set(() => ({ tonnage: to })),
  setSalvage: (to) => set(() => ({ salvage: to })),
});
