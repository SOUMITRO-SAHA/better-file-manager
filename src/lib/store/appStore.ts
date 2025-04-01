import { EFavouriteGroup } from "@/constants/default";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage } from "../storage";

// interface IWindow {}

interface AppStoreState {
  defaultSelectedDir: EFavouriteGroup;
  showSettings: boolean;
  splitView: boolean;
  // windows: [IWindow, IWindow];
  activeWindowIndex: 1 | 2;
}

interface AppStoreActions {
  setDefaultSelectedDir: (item: EFavouriteGroup) => void;
  setToggleShowSettings: () => void;
  setToggleSplitView: () => void;
  setActiveWindowIndex: (index: 1 | 2) => void;
}

const initialAppState: AppStoreState = {
  defaultSelectedDir: EFavouriteGroup.RECENTS,
  showSettings: false,
  splitView: false,
  activeWindowIndex: 1,
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    immer((set) => ({
      ...initialAppState,
      setDefaultSelectedDir: (dir: EFavouriteGroup) =>
        set((state) => {
          state.defaultSelectedDir = dir;
        }),
      setToggleShowSettings: () =>
        set((state) => {
          state.showSettings = !state.showSettings;
        }),
      setToggleSplitView: () =>
        set((state) => {
          state.splitView = !state.splitView;
        }),
      setActiveWindowIndex: (index: 1 | 2) =>
        set((state) => {
          state.activeWindowIndex = index;
        }),
    })),
    {
      name: "appStore",
      partialize: (state) => ({
        defaultSelectedDir: state.defaultSelectedDir,
        showSettings: state.showSettings,
        splitView: state.splitView,
        activeWindowIndex: state.activeWindowIndex,
      }),
      storage: createJSONStorage(() => storage),
    },
  ),
);
