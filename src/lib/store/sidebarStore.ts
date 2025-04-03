import {
  defaultSidebar,
  ESidebarGroup,
  ITag,
  type ISidebarItem,
  type SidebarType,
} from "@/lib/constants/default";
import { IDisk } from "@/types/system";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage } from "../storage";
import { useAppStore } from "./appStore";

interface SidebarStates {
  activeItem: ISidebarItem | IDisk | ITag;
  sidebarData: SidebarType | null;
}

interface SidebarActions {
  resetSidebar: () => void;
  setActiveItem: (item: ISidebarItem | IDisk | ITag) => void;
  setSidebarData: (data: SidebarType) => void;
}

const initialSidebarState: SidebarStates = {
  activeItem: getInitialalActiveItem() as any,
  sidebarData: null,
};

export const useSidebarStore = create<SidebarStates & SidebarActions>()(
  persist(
    immer((set) => ({
      ...initialSidebarState,
      resetSidebar: () => set(() => ({ sidebarData: defaultSidebar })),
      setSidebarData: (data: SidebarType) =>
        set((state) => {
          state.sidebarData = data;
        }),
      setActiveItem: (item: ISidebarItem | IDisk | ITag) =>
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
