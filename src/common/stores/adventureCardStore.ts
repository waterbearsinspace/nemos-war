import { create } from "zustand";

type AdventureCard = {
  id: number;
  title: string;
  flavor_text: string;
  type: string;
};

interface AdventureCardStore {
  adventureCards: Array<AdventureCard>;
}

// export const adventureCardStore = create<AdventureCardStore>()((set) => ({}));
