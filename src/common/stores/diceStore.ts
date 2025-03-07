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
  rollDie: (dieId: string) => void;
  rollAllActive: () => void;
}

// constants and functions
// min (inclusive) and max (exclusive) of die roll
const dieMinInclusive = 1;
const dieMaxExclusive = 7;

// Roll a die with possible from dieMinInclusive to dieMaxExclusive - 1
function randomDieRoll() {
  return Math.floor(
    Math.random() * (dieMinInclusive - dieMaxExclusive) + dieMaxExclusive
  );
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
      active: true,
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

  // Roll an individual dice with a given id
  rollDie: (dieId) =>
    set((state) => ({
      dice: state.dice.map((die) => {
        return {
          id: die.id,
          value: die.id == dieId ? randomDieRoll() : die.value,
          active: die.active,
        };
      }),
    })),

  // Roll all active dice
  rollAllActive: () =>
    set((state) => ({
      dice: state.dice.map((die) => {
        return {
          id: die.id,
          value: die.active ? randomDieRoll() : die.value,
          active: die.active,
        };
      }),
    })),
}));
