// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface UtilitySliceInterface {
  showModal: boolean;
  modalContentsId: string | null;

  setShowModal: (to: boolean) => void;
  setModalContentsId: (to: string | null) => void;
}

// slice
export const utilitySlice: StateCreator<UtilitySliceInterface, []> = (set) => ({
  showModal: false,
  modalContentsId: null,

  setShowModal: (to) => set(() => ({ showModal: to })),
  setModalContentsId: (to) => set(() => ({ modalContentsId: to })),
});
