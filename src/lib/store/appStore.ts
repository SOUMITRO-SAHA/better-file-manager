import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../storage";

interface AppStoreState {
    defaultSelectedDir: string | null;
}

interface AppStoreActions {}

const initialAppState: AppStoreState = {
    defaultSelectedDir: "recent",
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
    persist(
        () => ({
            ...initialAppState,
            // Implement your action methods here
        }),
        {
            name: "appStore",
            partialize: (state) => ({
                defaultSelectedDir: state.defaultSelectedDir,
            }),
            storage: createJSONStorage(() => storage),
        },
    ),
);
