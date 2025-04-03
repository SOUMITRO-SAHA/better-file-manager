import { cn } from "@/lib/utils";
import * as React from "react";
import MainHeader from "../header/main-header";
import Terminal from "../terminal/terminal";
import { SearchBar } from "../search";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BreadCrumbGenerator from "../breadcrumb/breadcrumb-generator";
import useAppEventListner from "@/hooks/useAppEventListner";
import { useAppStore } from "@/lib/store/appStore";

interface WindowProps {
  className?: string;
  window: 1 | 2;
}

const Window: React.FC<WindowProps> = (props) => {
  const { className, window } = props;

  // --- Hooks
  const { searchBarRef } = useAppEventListner();

  // --- Store
  const { setActiveWindowIndex, showTerminals, setTerminalState } =
    useAppStore();

  const shouldShowTerminal = showTerminals?.[window - 1];

  // --- Handlers
  const handleOnFocus = React.useCallback(() => {
    setActiveWindowIndex(window);
  }, [setActiveWindowIndex, window]);

  return (
    <section
      className={cn("w-full h-full", className)}
      tabIndex={0}
      onFocus={handleOnFocus}
      onMouseDown={(e) => {
        e.currentTarget.focus();
        handleOnFocus();
      }}
    >
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <div className={cn("flex flex-col justify-between")}>
            <div className="border-b">
              {/* App Header */}
              <MainHeader window={window} className="py-1">
                {/* Search bar */}
                <SearchBar className="w-auto flex-1 my-1" ref={searchBarRef} />
              </MainHeader>

              {/* Breadcrumb */}
              <div className="p-2 border-t">
                <BreadCrumbGenerator path="~/downloads/test/demo" />
              </div>
            </div>

            {/* Main Body */}
            <div className="flex-1 bg-background">
              {/* Main Body Content */}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {shouldShowTerminal && (
          <ResizablePanel minSize={10} maxSize={40} defaultSize={20}>
            <Terminal
              close={() => {
                setTerminalState((window - 1) as 0 | 1, !shouldShowTerminal);
              }}
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </section>
  );
};

export default Window;
