import { create } from "zustand";

interface DiceStore {
  dice: Array<Dice>;
  rollDie: (dieId: string) => void;
}

interface Dice {
  id: string;
  value: number;
  active: boolean;
}

export const diceStore = create<DiceStore>()((set) => ({
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
      active: true,
    },
    {
      id: "b2",
      value: 1,
      active: true,
    },
  ],

  rollDie: (dieId) =>
    set((state) => ({
      dice: state.dice.map((die) => {
        return {
          id: die.id,
          value:
            die.id == dieId
              ? Math.floor(Math.random() * (1 - 7) + 7)
              : die.value,
          active: die.active,
        };
      }),
    })),
}));
