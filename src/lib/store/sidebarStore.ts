import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../storage";
import { defaultSidebar, ISidebarItem } from "@/constants/default";
import { immer } from "zustand/middleware/immer";
import { IDisk } from "@/types/system";

interface SidebarStates {
    activeItem: ISidebarItem | IDisk;
}

interface SidebarActions {
    setActiveItem: (item: ISidebarItem | IDisk) => void;
}

const initialSidebarState: SidebarStates = {
    activeItem: defaultSidebar?.["favourites"]?.[0],
};

export const useSidebarStore = create<SidebarStates & SidebarActions>()(
    persist(
        immer((set) => ({
            ...initialSidebarState,
            setActiveItem: (item: ISidebarItem | IDisk) =>
                set((state) => {
                    state.activeItem = item;
                }),
        })),
        {
            name: "sidebarStore",
            partialize: (state) => ({}),
            storage: createJSONStorage(() => storage),
        },
    ),
);
