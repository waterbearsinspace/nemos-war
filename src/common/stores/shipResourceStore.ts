import { create } from "zustand";

interface ShipResourceStore {
  resources: {
    nemo: number;
    crew: number;
    hull: number;
  };
}

export const shipResourceStore = create<ShipResourceStore>()((set) => ({
  resources: {
    nemo: 0,
    crew: 0,
    hull: 0,
  },
}));
