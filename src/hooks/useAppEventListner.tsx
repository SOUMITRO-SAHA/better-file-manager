import { SearchBarHandle } from "@/components/custom/search";
import { listen } from "@tauri-apps/api/event";
import * as React from "react";

interface UseSystemReturn {
  searchBarRef: React.RefObject<SearchBarHandle>;
}

const useAppEventListner = (): UseSystemReturn => {
  // -- Ref
  const searchBarRef = React.useRef<SearchBarHandle>(null);

  // --- Effects
  React.useEffect(() => {
    const unlisten = listen("focus-searchbar", () => {
      searchBarRef.current?.focusInput();
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return { searchBarRef };
};

export default useAppEventListner;
