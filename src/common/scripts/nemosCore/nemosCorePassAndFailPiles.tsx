import { adventureCard } from "../../../components/Cards/AdventureCard/AdventureCard";
import { nemosStore } from "../../stores/nemosStore";

export function passCard(card: adventureCard) {
  const passPile = nemosStore.getState().passPile;
  const setPassPile = nemosStore.getState().setPassPile;

  setPassPile([...passPile, card]);
}
export function failCard(card: adventureCard) {
  const failPile = nemosStore.getState().failPile;
  const setFailPile = nemosStore.getState().setFailPile;

  setFailPile([...failPile, card]);
}
