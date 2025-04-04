import { WindowID } from "@/types/window";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage } from "../storage";
import { useAppStore } from "./appStore";

interface FileStoreState {
  deepestPath: Record<WindowID, string>;
  selectedPath: Record<WindowID, string>;
}

interface FileStoreActions {
  setSelectedPath: (path: string) => void;
  setDeepestPath: (path: string) => void;
}

const defaultWindowPath: Readonly<Record<WindowID, string>> = {
  1: "/",
  2: "/",
};

const initialState: FileStoreState = {
  deepestPath: { ...defaultWindowPath },
  selectedPath: { ...defaultWindowPath },
};

export const useFileStore = create<FileStoreState & FileStoreActions>()(
  persist(
    immer((set) => ({
      ...initialState,

      setSelectedPath: (path: string) =>
        set((state) => {
          const { activeWindowIndex } = useAppStore.getState();

          if (activeWindowIndex in state.selectedPath) {
            state.selectedPath[activeWindowIndex] = path;
          }
        }),
      setDeepestPath: (path: string) =>
        set((state) => {
          const { activeWindowIndex } = useAppStore.getState();

          if (activeWindowIndex in state.selectedPath) {
            state.deepestPath[activeWindowIndex] = path;
          }
        }),
    })),
    {
      name: "fileStore",
      storage: createJSONStorage(() => storage),
    },
  ),
);
