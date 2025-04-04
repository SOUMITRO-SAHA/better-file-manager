import { IFileMetadata } from "@/types/file";
import { invoke } from "@tauri-apps/api/core";
import { homeDir } from "@tauri-apps/api/path";
import * as React from "react";

interface UseSystemProps {
  mountPoint: string;
}

interface UseSystemReturn {
  homeDir: string;
  dirContentDetails: IFileMetadata[];
}

const useFileManager = (props: UseSystemProps): UseSystemReturn => {
  const { mountPoint = "/" } = props;

  const [dirContentDetails, setDirContentDetails] = React.useState<
    IFileMetadata[]
  >([]);
  const [homeDirectoryPath, setHomeDirectoryPath] = React.useState<string>("");

  // --- Effects
  React.useEffect(() => {
    const fetchDir = async () => {
      const homeDirPath = await homeDir();
      setHomeDirectoryPath(homeDirPath);
    };

    fetchDir();
  }, []);

  React.useEffect(() => {
    const fetchSelectedPath = async () => {
      const dirContentDetails: IFileMetadata[] = await invoke(
        "read_inside_dir",
        { path: mountPoint },
      );
      setDirContentDetails(dirContentDetails);
    };

    fetchSelectedPath();
  }, [mountPoint]);

  return {
    homeDir: homeDirectoryPath,
    dirContentDetails,
  };
};

export default useFileManager;
