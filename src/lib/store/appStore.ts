import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../storage";

interface AppStoreState {
  // Define your state properties here
}

interface AppStoreActions {
  // Define your action methods here
}

const initialAppState: AppStoreState = {
  // Initialize your state properties here
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    () => ({
      ...initialAppState,
      // Implement your action methods here
    }),
    {
      name: "appStore",
      partialize: (state) => ({}),
      storage: createJSONStorage(() => storage),
    },
  ),
);
