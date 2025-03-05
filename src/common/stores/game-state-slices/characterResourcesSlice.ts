// character resources' status

// sacrifice character

type Character = {
  id: number;
  name: string;
  survivingCharacterVp: number;
  sacrificed: boolean;
};

interface CharacterResourcesSliceInterface {
  chiefEngineer: Character;
  FirstOfficer: Character;
  secondOfficer: Character;
  conseil: Character;
  nedLand: Character;
  professorAronnax: Character;
}
