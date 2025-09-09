import { create } from "zustand";


interface BorrowerState {
    activeBorrowerId: string | null;
    setActiveBorrower: (id: string) => void;
}


export const useBorrowerStore = create < BorrowerState > ((set) => ({
    activeBorrowerId: null,
    setActiveBorrower: (id) => set({ activeBorrowerId: id }),
}));