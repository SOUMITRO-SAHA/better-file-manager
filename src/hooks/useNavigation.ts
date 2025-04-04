import { useAppStore } from "@/lib/store/appStore";
import { useFileStore } from "@/lib/store/fileStore";

interface UseSystemReturn {
  isForwardAvailable: boolean;
  isBackwardAvailable: boolean;
}

const useNavigation = (): UseSystemReturn => {
  const { activeWindowIndex } = useAppStore();
  const { selectedPath, deepestPath } = useFileStore();

  const isForwardAvailable =
    selectedPath[activeWindowIndex] !== deepestPath[activeWindowIndex];
  const isBackwardAvailable = selectedPath[activeWindowIndex] !== "/";

  return {
    isForwardAvailable,
    isBackwardAvailable,
  };
};

export default useNavigation;
