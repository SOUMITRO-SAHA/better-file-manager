/**
 * Here we will follow lower case only, no capitalisation
 */

import { IDisk } from "@/types/system";
import { Platform } from "@tauri-apps/plugin-os";
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

export interface ISidebarItem {
  name: string; // will act as a key
  icon: LucideIcon;
  mountPoint: string;
  targetPlatform: Platform[];
  defaultDisplay?: boolean;
}

export interface ITag {
  name: string;
  color: string;
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
  NETWORK = "network",
  TAGS = "tags",
}

export enum EFavouriteGroup {
  DEVELOPER = "developer",
  RECENTS = "recents",
  HOME = "home",
  APPLICATIONS = "applications",
  DESKTOP = "desktop",
  DOCUMENTS = "documents",
  DOWNLOADS = "downloads",
  MUSIC = "music",
  PICTURES = "pictures",
  VIDEOS = "videos",
  TRASH = "trash",
}

export const defaultSidebar: Readonly<SidebarType> = {
  favourites: [
    {
      name: "developer",
      icon: CodeXml,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["linux", "windows", "macos"],
    },
    {
      name: "recents",
      icon: History,
      mountPoint: "", // Will Update based on the Platform
      defaultDisplay: true,
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "home",
      icon: House,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "applications",
      icon: PencilRuler,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos"],
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
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "downloads",
      icon: CircleArrowDown,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "music",
      icon: Music,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "pictures",
      icon: FileImage,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "videos",
      icon: Film,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "movies",
      icon: Film,
      mountPoint: "", // Will Update based on the Platform
      targetPlatform: ["macos", "linux", "windows"],
    },
    {
      name: "trash",
      icon: Trash2,
      mountPoint: "", // Will Update based on the Platform
      defaultDisplay: true,
      targetPlatform: ["macos", "linux", "windows"],
    },
  ],
  locations: [],
};

/**
 * This will be like search implementation
 * TODO: Will take in the V2 (Sprint 2)
 */
export const defaultTags: { tags: ITag[] } = {
  tags: [
    {
      name: "red",
      color: "#FF0000",
    },
    {
      name: "orange",
      color: "#FFA500",
    },
    {
      name: "green",
      color: "#00FF00",
    },
  ],
};

/**
 * ====== [Screens] ======
 */
