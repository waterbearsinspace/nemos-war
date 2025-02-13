import { create } from "zustand";
import { Dice } from "../../components/Dice/DiceInterface";

// Die constants and functions
const dieMinInclusive = 1;
const dieMaxExclusive = 7;
function randomDieRoll() {
  return Math.floor(
    Math.random() * (dieMinInclusive - dieMaxExclusive) + dieMaxExclusive
  );
}

// DiceStore - Information an all dice
interface DiceStore {
  dice: Array<Dice>;
  rollDie: (dieId: string) => void;
  rollAllActive: () => void;
}

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
