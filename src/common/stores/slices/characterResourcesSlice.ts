// modules
import { StateCreator } from "zustand";

// types and interfaces
type character = {
  id: number;
  name: string;
  survivingCharacter: number;
};
export interface CharacterResourcesSliceInterface {
  chiefEngineer: character;
  firstOfficer: character;
  secondOfficer: character;
  conseil: character;
  nedLand: character;
  professorAronnax: character;
  sacrificed: boolean[];
  sacrificeCharacter: (id: number) => void;
}

// data and constants
import characterResourceData from "../../data/characterResources.json";
const chiefEngineerData = characterResourceData[0];
const firstOfficerData = characterResourceData[1];
const secondOfficerData = characterResourceData[2];
const conseilData = characterResourceData[3];
const nedLandData = characterResourceData[4];
const professorAronnaxData = characterResourceData[5];

// slice
export const characterResourceSlice: StateCreator<
  CharacterResourcesSliceInterface,
  []
> = (set) => ({
  chiefEngineer: { ...chiefEngineerData },
  firstOfficer: { ...firstOfficerData },
  secondOfficer: { ...secondOfficerData },
  conseil: { ...conseilData },
  nedLand: { ...nedLandData },
  professorAronnax: { ...professorAronnaxData },
  sacrificed: [false, false, false, false, false, false],

  sacrificeCharacter: (sacrificedId) =>
    set((state) => ({
      sacrificed: state.sacrificed.map((characterStatus, id) => {
        if (id == sacrificedId) return true;
        else return characterStatus;
      }),
    })),
});
