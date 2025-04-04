import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useScreenSize from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";
import * as React from "react";
import Window from "./window";
import { useAppStore } from "@/lib/store/appStore";

interface WorkspaceProps {
  className?: string;
  children?: React.ReactNode;
}

const Workspace: React.FC<WorkspaceProps> = (props) => {
  const { className } = props;
  const { screenSize, isMobileScreen } = useScreenSize();

  // --- Store
  const { splitView } = useAppStore();

  const minSizeOfWindow =
    screenSize === "2xl" ? 30 : screenSize === "lg" ? 30 : 40;

  return (
    <main
      className={cn("h-svh w-svw overflow-hidden bg-neutral-950", className)}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={minSizeOfWindow} tabIndex={0}>
          <Window window={1} />
        </ResizablePanel>
        <ResizableHandle />
        {splitView && !isMobileScreen && (
          <ResizablePanel minSize={minSizeOfWindow} tabIndex={1}>
            <Window window={2} />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </main>
  );
};

export default React.memo(Workspace);
