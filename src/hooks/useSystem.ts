import { IDisk } from "@/types/system";
import { invoke } from "@tauri-apps/api/core";
import * as React from "react";

interface UseSystemReturn {
    disks: IDisk[] | null;
}

export const useSystem = (): UseSystemReturn => {
    const [disks, setDisks] = React.useState<IDisk[] | null>(null);
    const [favourites, setFavourites] = React.useState<IDisk[] | null>(null);

    // --- Effects
    React.useEffect(() => {
        const getDisks = setTimeout(async () => {
            const disks = (await invoke("get_disk_info")) as IDisk[];
            setDisks(disks);
        }, 1000);

        const getFavouriteDirectories = setTimeout(async () => {
            const favouritesFolders = await invoke("list_directories", {
                directory: "/",
            });
            console.log("All folders: ", favouritesFolders);
        }, 1000);

        return () => {
            clearTimeout(getDisks);
            clearTimeout(getFavouriteDirectories);
        };
    }, []);

    // --- Functions

    return {
        disks,
    };
};

export default useSystem;
