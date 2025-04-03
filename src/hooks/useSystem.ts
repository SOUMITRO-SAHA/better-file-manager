import { defaultSidebar, ISidebarItem } from "@/lib/constants/default";
import { useAppStore } from "@/lib/store/appStore";
import { IDisk } from "@/types/system";
import { invoke } from "@tauri-apps/api/core";
import { platform } from "@tauri-apps/plugin-os";
import * as React from "react";

interface UseSystemReturn {
  disks: IDisk[] | null;
  favourites: ISidebarItem[] | null;
  platformName: string;
}

export const useSystem = (): UseSystemReturn => {
  // --- States
  const [disks, setDisks] = React.useState<IDisk[] | null>(null);
  const [favourites, setFavourites] = React.useState<ISidebarItem[] | null>(
    null,
  );
  const [platformName, setPlatformName] = React.useState<string>("");

  // --- Store
  const { showHiddenFiles } = useAppStore();

  // --- Effects
  React.useEffect(() => {
    const getDisks = setTimeout(async () => {
      const disks = (await invoke("get_disk_info")) as IDisk[];
      setDisks(disks);
    }, 1000);

    const getFavouriteDirectories = setTimeout(async () => {
      const favouritesFolders = (await invoke(
        "get_user_directory",
      )) as string[];

      const platformName = platform();
      setPlatformName(platformName);

      const targetFolders = defaultSidebar.favourites
        .filter((item) => {
          if (item.targetPlatform.includes(platformName)) {
            return true;
          }

          return false;
        })
        .map((item) => item.name);

      const filteredFavouriteFolders = favouritesFolders
        ?.filter((folder) => showHiddenFiles || !folder.includes("."))
        .map((folder) => {
          const folderName = folder.split("/")?.pop()?.toLowerCase() || "";

          if (!targetFolders.includes(folderName)) {
            return null;
          }

          const sidebarItem = defaultSidebar.favourites.find(
            (item) => item.name === folderName,
          );

          if (!sidebarItem) {
            return null;
          }

          const disk: ISidebarItem = {
            ...sidebarItem,
            mountPoint: folder,
          };

          return disk;
        })
        ?.filter((folder) => folder !== null);

      // --- Rendering the default Folders
      const defaultFolders = defaultSidebar.favourites.filter(
        (folder) => folder.defaultDisplay,
      );

      // --- Final Folders
      const finalFolders = [
        ...defaultFolders,
        ...filteredFavouriteFolders,
      ].sort((a, b) => a.name.localeCompare(b.name));

      setFavourites(finalFolders);
    }, 1000);

    return () => {
      clearTimeout(getDisks);
      clearTimeout(getFavouriteDirectories);
    };
  }, []);

  return {
    disks,
    favourites,
    platformName,
  };
};

export default useSystem;
