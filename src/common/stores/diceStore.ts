// module
import { create } from "zustand";

// types and interfaces
export type Dice = {
  id: string;
  value: number;
  active: boolean;
};
interface DiceStore {
  dice: Array<Dice>;
  setDice: (newDice: Array<Dice>) => void;
}

// slice
export const diceStore = create<DiceStore>()((set) => ({
  // Array of all dice
  dice: [
    {
      id: "w1",
      value: 1,
      active: true,
    },
    {
      id: "w2",
      value: 1,
      active: true,
    },
    {
      id: "w3",
      value: 1,
      active: false,
    },
    {
      id: "b1",
      value: 1,
      active: false,
    },
    {
      id: "b2",
      value: 1,
      active: false,
    },
  ],

  setDice: (newDice) => {
    set(() => ({ dice: newDice }));
  },
}));
