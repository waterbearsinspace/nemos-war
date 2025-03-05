import { StateCreator } from "zustand";

import characterResourceData from "../../data/characterResources.json";

// character resources' status

// sacrifice character

type Character = {
  id: number;
  name: string;
  survivingCharacterVp: number;
};

export interface CharacterResourcesSliceInterface {
  chiefEngineer: Character;
  firstOfficer: Character;
  secondOfficer: Character;
  conseil: Character;
  nedLand: Character;
  professorAronnax: Character;
  sacrificed: boolean[];
  sacrificeCharacter: (id: number) => void;
}

let chiefEngineerData = characterResourceData[0];
let firstOfficerData = characterResourceData[1];
let secondOfficerData = characterResourceData[2];
let conseilData = characterResourceData[3];
let nedLandData = characterResourceData[4];
let professorAronnaxData = characterResourceData[5];

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
