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

  setDice: (to: Array<dice>) => void;
  setDoneRolling: (to: boolean) => void;
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

  setDice: (to) => {
    set(() => ({ dice: to }));
  },
  setDoneRolling: (to) => {
    set(() => ({ doneRolling: to }));
  },
}));
