import { EFavouriteGroup } from "@/lib/constants/default";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage } from "../storage";

export type FileViewOptionType = "list" | "detailed-list" | "grid";

interface AppStoreState {
  defaultSelectedDir: EFavouriteGroup;
  showSettings: boolean;
  showHiddenFiles: boolean;
  splitView: boolean;
  showTerminals: [boolean, boolean]; // let the index be the window
  activeWindowIndex: 1 | 2;
  fileViewOption: FileViewOptionType;
}

interface AppStoreActions {
  setDefaultSelectedDir: (item: EFavouriteGroup) => void;
  setToggleShowSettings: () => void;
  setToggleSplitView: (display: boolean) => void;
  setActiveWindowIndex: (index: 1 | 2) => void;
  setTerminalState: (index: 0 | 1, value: boolean) => void;
  setFileViewOption: (option: FileViewOptionType) => void;
  setShowHiddenFiles: (value: boolean) => void;
  reset: () => void;
}

const initialAppState: AppStoreState = {
  defaultSelectedDir: EFavouriteGroup.RECENTS,
  showSettings: false,
  showHiddenFiles: false,
  splitView: false,
  activeWindowIndex: 1,
  showTerminals: [false, false],
  fileViewOption: "list", // Default file view option
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
      setToggleSplitView: (display: boolean) =>
        set((state) => {
          state.splitView = display;
        }),
      setActiveWindowIndex: (index: 1 | 2) =>
        set((state) => {
          state.activeWindowIndex = index;
        }),
      setTerminalState: (index: 0 | 1, value: boolean) =>
        set((state) => {
          state.showTerminals[index] = value;
        }),
      setFileViewOption: (option: FileViewOptionType) =>
        set((state) => {
          state.fileViewOption = option;
        }),
      setShowHiddenFiles: (value: boolean) =>
        set((state) => {
          state.showHiddenFiles = value;
        }),
      reset: () => {
        set(initialAppState);
      },
    })),
    {
      name: "appStore",
      partialize: (state) => ({
        defaultSelectedDir: state.defaultSelectedDir,
        showSettings: state.showSettings,
        splitView: state.splitView,
        activeWindowIndex: state.activeWindowIndex,
        showTerminals: state.showTerminals,
        fileViewOption: state.fileViewOption,
      }),
      storage: createJSONStorage(() => storage),
    },
  ),
);
