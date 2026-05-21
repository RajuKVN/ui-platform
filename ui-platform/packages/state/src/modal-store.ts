import { create } from 'zustand';

export interface ModalState {
  /** Currently open modal ID */
  activeModal: string | null;
  /** Modal data/props */
  modalData: Record<string, unknown>;
  /** Stack of modals for nested modals */
  modalStack: string[];
}

export interface ModalActions {
  /** Open a modal by ID */
  openModal: (id: string, data?: Record<string, unknown>) => void;
  /** Close the current modal */
  closeModal: () => void;
  /** Close a specific modal */
  closeModalById: (id: string) => void;
  /** Close all modals */
  closeAllModals: () => void;
  /** Check if a modal is open */
  isModalOpen: (id: string) => boolean;
  /** Update modal data */
  updateModalData: (data: Record<string, unknown>) => void;
}

export type ModalStore = ModalState & ModalActions;

/**
 * Modal state store
 * Manages modal open/close state and data
 */
export const useModalStore = create<ModalStore>((set, get) => ({
  activeModal: null,
  modalData: {},
  modalStack: [],

  openModal: (id, data = {}) => {
    set((state) => ({
      activeModal: id,
      modalData: data,
      modalStack: [...state.modalStack, id],
    }));
  },

  closeModal: () => {
    set((state) => {
      const newStack = state.modalStack.slice(0, -1);
      return {
        activeModal: newStack[newStack.length - 1] ?? null,
        modalData: {},
        modalStack: newStack,
      };
    });
  },

  closeModalById: (id) => {
    set((state) => {
      const newStack = state.modalStack.filter((m) => m !== id);
      const newActiveModal =
        state.activeModal === id ? (newStack[newStack.length - 1] ?? null) : state.activeModal;
      return {
        activeModal: newActiveModal,
        modalData: state.activeModal === id ? {} : state.modalData,
        modalStack: newStack,
      };
    });
  },

  closeAllModals: () => {
    set({
      activeModal: null,
      modalData: {},
      modalStack: [],
    });
  },

  isModalOpen: (id) => get().activeModal === id,

  updateModalData: (data) => {
    set((state) => ({
      modalData: { ...state.modalData, ...data },
    }));
  },
}));
