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
  adjustTonnage: (ocean: string, by: number) => void;
  salvage: number;
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

  adjustTonnage: (ocean, by) =>
    set((state) => ({
      tonnage: { ...state.tonnage, [ocean]: by },
    })),
});
