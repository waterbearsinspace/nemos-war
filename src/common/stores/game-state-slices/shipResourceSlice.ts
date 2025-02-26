import { create } from "zustand";

interface ShipResourceStore {
  resources: {
    nemo: number;
    crew: number;
    hull: number;
  };
}

// Keep track of ship resources
export const shipResourceStore = create<ShipResourceStore>()((set) => ({
  resources: {
    nemo: 0,
    crew: 0,
    hull: 0,
  },

  // add ship resources
  // remove ship resources
}));
