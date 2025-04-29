// module
import { create } from "zustand";

// types and interfaces
export type dice = {
  id: string;
  value: number;
  placement: boolean;
};
interface DiceStore {
  dice: Array<dice>;
  doneRolling: boolean;
  exertingNemo: boolean;
  exertingCrew: boolean;
  exertingHull: boolean;
  activeDice: Array<dice>;

  setDice: (to: Array<dice>) => void;
  setDoneRolling: (to: boolean) => void;
  setExertingNemo: (to: boolean) => void;
  setExertingCrew: (to: boolean) => void;
  setExertingHull: (to: boolean) => void;
  setActiveDice: (to: Array<dice>) => void;
}

// slice
export const diceStore = create<DiceStore>()((set) => ({
  // Array of all dice
  dice: [
    {
      id: "w1",
      value: 1,
      placement: true,
    },
    {
      id: "w2",
      value: 1,
      placement: true,
    },
    {
      id: "w3",
      value: 1,
      placement: false,
    },
    {
      id: "b1",
      value: 1,
      placement: false,
    },
    {
      id: "b2",
      value: 1,
      placement: false,
    },
  ],
  doneRolling: false,
  exertingNemo: false,
  exertingCrew: false,
  exertingHull: false,
  activeDice: [],

  setDice: (to) => {
    set(() => ({ dice: to }));
  },
  setDoneRolling: (to) => {
    set(() => ({ doneRolling: to }));
  },
  setExertingNemo: (to) => {
    set(() => ({ exertingNemo: to }));
  },
  setExertingCrew: (to) => {
    set(() => ({ exertingCrew: to }));
  },
  setExertingHull: (to) => {
    set(() => ({ exertingHull: to }));
  },
  setActiveDice: (to) => set(() => ({ activeDice: to })),
}));
