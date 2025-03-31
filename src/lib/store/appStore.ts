import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../storage";
import { immer } from "zustand/middleware/immer";
import { EFavouriteGroup } from "@/constants/default";

interface AppStoreState {
  defaultSelectedDir: EFavouriteGroup;
}

interface AppStoreActions {
  setDefaultSelectedDir: (item: EFavouriteGroup) => void;
}

const initialAppState: AppStoreState = {
  defaultSelectedDir: EFavouriteGroup.RECENTS,
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    immer((set) => ({
      ...initialAppState,
      setDefaultSelectedDir: (dir: EFavouriteGroup) =>
        set((state) => {
          state.defaultSelectedDir = dir;
        }),
    })),
    {
      name: "appStore",
      partialize: (state) => ({
        defaultSelectedDir: state.defaultSelectedDir,
      }),
      storage: createJSONStorage(() => storage),
    },
  ),
);
