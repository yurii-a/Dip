import { create } from "zustand";

interface IStore {
  user: any;
  setUser: (user: any) => void;
}

const useStore = create<IStore>((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user: user })),
}));

export default useStore;
