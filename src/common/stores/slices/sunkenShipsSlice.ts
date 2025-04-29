// tonnage

// salvage

// modules
import { StateCreator } from "zustand";
import { ship } from "./shipPoolsSlice";

// types and interfaces
export interface SunkenShipsSliceInterface {
  westernPacificTonnage: ship[];
  easternPacificTonnage: ship[];
  northAtlanticTonnage: ship[];
  southAtlanticTonnage: ship[];
  europeanSeasTonnage: ship[];
  indianOceanTonnage: ship[];
  salvage: number;
  salvagedShips: ship[];

  setWesternPacificTonnage: (to: ship[]) => void;
  setEasternPacificTonnage: (to: ship[]) => void;
  setNorthAtlanticTonnage: (to: ship[]) => void;
  setSouthAtlanticTonnage: (to: ship[]) => void;
  setEuropeanSeasTonnage: (to: ship[]) => void;
  setIndianOceanTonnage: (to: ship[]) => void;
  setSalvage: (to: number) => void;
  setSalvagedShips: (to: ship[]) => void;
}

export const sunkenShipsSlice: StateCreator<SunkenShipsSliceInterface, []> = (
  set
) => ({
  westernPacificTonnage: [],
  easternPacificTonnage: [],
  northAtlanticTonnage: [],
  southAtlanticTonnage: [],
  europeanSeasTonnage: [],
  indianOceanTonnage: [],
  salvage: 0,
  salvagedShips: [],

  setWesternPacificTonnage: (to) => set({ westernPacificTonnage: to }),
  setEasternPacificTonnage: (to) => set({ easternPacificTonnage: to }),
  setNorthAtlanticTonnage: (to) => set({ northAtlanticTonnage: to }),
  setSouthAtlanticTonnage: (to) => set({ southAtlanticTonnage: to }),
  setEuropeanSeasTonnage: (to) => set({ europeanSeasTonnage: to }),
  setIndianOceanTonnage: (to) => set({ indianOceanTonnage: to }),
  setSalvage: (to) => set(() => ({ salvage: to })),
  setSalvagedShips: (to) => set(() => ({ salvagedShips: to })),
});
