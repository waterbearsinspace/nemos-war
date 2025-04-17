// modules
import { StateCreator } from "zustand";

// types and interfaces
type character = {
  id: number;
  name: string;
  survivingCharacter: number;
  sacrificed: boolean;
};
export interface CharacterResourcesSliceInterface {
  characterResources: character[];

  setCharacterResources: (to: character[]) => void;
}

// data and constants
import characterResourceData from "../../data/characterResources.json";
const chiefEngineerData = characterResourceData[0];
const firstOfficerData = characterResourceData[1];
const secondOfficerData = characterResourceData[2];
const conseilData = characterResourceData[3];
const nedLandData = characterResourceData[4];
const professorAronnaxData = characterResourceData[5];

const initialCharacters: character[] = [
  { ...chiefEngineerData, sacrificed: false },
  { ...firstOfficerData, sacrificed: false },
  { ...secondOfficerData, sacrificed: false },
  { ...conseilData, sacrificed: false },
  { ...nedLandData, sacrificed: false },
  { ...professorAronnaxData, sacrificed: false },
];

// slice
export const characterResourceSlice: StateCreator<
  CharacterResourcesSliceInterface,
  []
> = (set) => ({
  characterResources: initialCharacters,

  setCharacterResources: (to) => {
    set(() => ({ characterResources: to }));
  },
});
