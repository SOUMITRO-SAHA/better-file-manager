/**
 * Here we will follow lower case only, no capitalisation
 */

import { cn } from "@/lib/utils";
import { IDisk } from "@/types/system";
import {
    Circle,
    CircleArrowDown,
    CodeXml,
    FileImage,
    FileText,
    Film,
    History,
    House,
    Laptop,
    type LucideIcon,
    Music,
    PencilRuler,
    Trash2,
} from "lucide-react";

type PlatformType = "mac" | "windows" | "linux";

export interface ISidebarItem {
    name: string; // will act as a key
    icon: LucideIcon;
    mountPoint: string;
    targetPlatform: PlatformType[];
}

export interface ISidebarGroup {
    title: string;
    data: ISidebarItem;
}

export type SidebarType = {
    favourites: ISidebarItem[];
    locations: IDisk[];
};

export enum ESidebarGroup {
    FAVOURITES = "favourites",
    LOCATIONS = "locations",
}

export const defaultSidebar: Readonly<SidebarType> = {
    favourites: [
        {
            name: "developer",
            icon: CodeXml,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["linux", "windows", "mac"],
        },
        {
            name: "recents",
            icon: History,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "home",
            icon: House,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "applications",
            icon: PencilRuler,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac"],
        },
        {
            name: "desktop",
            icon: Laptop,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["linux", "windows"],
        },
        {
            name: "documents",
            icon: FileText,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "downloads",
            icon: CircleArrowDown,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "music",
            icon: Music,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "Pictures",
            icon: FileImage,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "videos",
            icon: Film,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
        {
            name: "trash",
            icon: Trash2,
            mountPoint: "", // Will Update based on the Platform
            targetPlatform: ["mac", "linux", "windows"],
        },
    ],
    locations: [],
};

/**
 * This will be like search implementation
 * TODO: Will take in the V2 (Sprint 2)
 */
export const defaultTags = {
    tags: [
        {
            name: "red",
            icon: (className?: string) => (
                <Circle
                    className={cn("fill-red-500 text-red-500", className)}
                />
            ),
        },
        {
            name: "orange",
            icon: (className?: string) => (
                <Circle
                    className={cn("fill-orange-500 text-orange-500", className)}
                />
            ),
        },
        {
            name: "green",
            icon: (className?: string) => (
                <Circle
                    className={cn("fill-gray-500 text-gray-500", className)}
                />
            ),
        },
    ],
};
