import { IDisk } from "@/types/system";
import { invoke } from "@tauri-apps/api/core";
import * as React from "react";

interface UseSystemReturn {
  disks: IDisk[] | null;
  formatDiskSize: (size: number | string) => Promise<string>;
}

export const useSystem = (): UseSystemReturn => {
  const [disks, setDisks] = React.useState<IDisk[] | null>(null);
  console.log("Disk Info:", disks);

  // --- Effects
  React.useEffect(() => {
    const getDisks = setTimeout(async () => {
      const disks = (await invoke("get_disk_info")) as IDisk[];
      setDisks(disks);
    }, 1000);

    return () => clearTimeout(getDisks);
  }, []);

  // --- Functions
  const formatDiskSize = async (size: number | string): Promise<string> => {
    if (typeof size === "string") {
      size = parseInt(size);
    }

    const formatedSize = (await invoke("format_file_size", { size })) as string;
    return formatedSize;
  };

  return {
    disks,
    formatDiskSize,
  };
};

export default useSystem;
