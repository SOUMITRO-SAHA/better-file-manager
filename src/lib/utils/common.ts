import { FileViewOptionType, useAppStore } from "../store/appStore";
import { useFileStore } from "../store/fileStore";

export const toggleSplitView = (display: boolean) => {
  const appStore = useAppStore.getState();
  appStore.setToggleSplitView(display);
};

export const changeFileViewOption = (view: FileViewOptionType) => {
  const appStore = useAppStore.getState();
  appStore.setFileViewOption(view);
};

type PathChangeType = {
  direction?: "backward" | "forward";
  destinationPath?: string;
};

/**
 * Updates the selected path based on the direction or a destination path.
 * Handles edge cases such as navigation back from root and case-insensitive folder selection.
 *
 * @param {Object} params - The parameters for path change.
 * @param {"backward" | "forward"} params.direction - The navigation direction.
 * @param {string} params.destinationPath - The target folder name or path (Optional).
 */
export const pathChange = ({ direction, destinationPath }: PathChangeType) => {
  // --- Store
  const { activeWindowIndex } = useAppStore.getState();
  const { selectedPath, deepestPath, setSelectedPath } =
    useFileStore.getState();

  // --- Path
  const selectedPathStr = selectedPath[activeWindowIndex];
  const deepestPathStr = deepestPath[activeWindowIndex];

  if (!selectedPath) {
    console.error("Selected path is undefined");
    return;
  }

  let updatedPath = selectedPathStr;

  // --- Path Segment
  let selectedPathSegments = selectedPathStr?.split("/");
  let deepestPathSegments = deepestPathStr?.split("/");
  let destinationPathSegments = destinationPath?.split("/");

  let destinationFolderName =
    destinationPathSegments?.[deepestPathSegments.length - 1];

  if (direction === "backward") {
    if (selectedPathSegments.length > 1) {
      updatedPath = selectedPathSegments?.slice(0, -1)?.join("/") || "/";
    } else {
      console.warn("Already at the root directory.");
    }
  } else if (direction === "forward") {
    const matchedFolderIndex = deepestPathSegments?.findIndex(
      (folderName) =>
        folderName.toLowerCase() ===
        selectedPathSegments?.[selectedPathSegments.length - 1]?.toLowerCase(),
    );

    if (
      matchedFolderIndex &&
      matchedFolderIndex < deepestPathSegments.length - 1 &&
      matchedFolderIndex > 0
    ) {
      const forwardFolder = deepestPathSegments?.[matchedFolderIndex + 1];
      updatedPath = `${selectedPathStr}/${forwardFolder}`;
    } else {
      console.error(`Folder does not exist.`);
      return;
    }
  } else if (destinationPath) {
    const isFolderAvailable =
      selectedPath[activeWindowIndex].includes(destinationPath);
    updatedPath = destinationPath;

    if (!isFolderAvailable) {
      console.error(`Folder '${destinationFolderName}' does not exist.`);
      return;
    }
  }

  setSelectedPath(updatedPath);
};
