import {
  defaultSidebar,
  ESidebarGroup,
  type ISidebarItem,
  type SidebarType,
} from "@/constants/default";
import { IDisk } from "@/types/system";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage } from "../storage";
import { useAppStore } from "./appStore";

interface SidebarStates {
  activeItem: ISidebarItem | IDisk;
  sidebarData: SidebarType;
}

interface SidebarActions {
  setActiveItem: (item: ISidebarItem | IDisk) => void;
  resetSidebar: () => void;
}

const initialSidebarState: SidebarStates = {
  activeItem: getInitialalActiveItem() as any,
  sidebarData: defaultSidebar,
};

export const useSidebarStore = create<SidebarStates & SidebarActions>()(
  persist(
    immer((set) => ({
      ...initialSidebarState,
      resetSidebar: () => set(() => ({ sidebarData: defaultSidebar })),
      setActiveItem: (item: ISidebarItem | IDisk) =>
        set((state) => {
          state.activeItem = item;
        }),
    })),
    {
      name: "sidebarStore",
      partialize: (state) => ({
        activeItem: state.activeItem,
        sidebarData: state.sidebarData,
      }),
      storage: createJSONStorage(() => storage),
    },
  ),
);

// --- Utilities
function getInitialalActiveItem(): ISidebarItem | undefined {
  const { defaultSelectedDir } = useAppStore.getState();

  // --- Default Sidebar Item
  const defaultSidebarItem = defaultSidebar?.[ESidebarGroup.FAVOURITES]?.find(
    (item) => item.name === "recents",
  );

  // --- Selected Sidebar Item
  const selectedSidebarItem = defaultSidebar?.[ESidebarGroup.FAVOURITES]?.find(
    (item) => item.name === defaultSelectedDir,
  );

  return defaultSidebar?.[ESidebarGroup.FAVOURITES]
    ? selectedSidebarItem
    : defaultSidebarItem;
}
