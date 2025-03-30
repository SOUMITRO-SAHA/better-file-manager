import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useScreenSize from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";
import * as React from "react";
import Window from "./window";

interface WorkspaceProps {
  className?: string;
  children?: React.ReactNode;
}

const Workspace: React.FC<WorkspaceProps> = (props) => {
  const { className } = props;
  const splitview = true; // Will come from user command
  const { screenSize, isMobileScreen } = useScreenSize();

  const minSizeOfWindow =
    screenSize === "2xl" ? 30 : screenSize === "lg" ? 30 : 40;

  return (
    <main
      className={cn("h-svh w-svw overflow-hidden bg-neutral-950", className)}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={minSizeOfWindow}>
          <Window window={1} />
        </ResizablePanel>
        <ResizableHandle />
        {splitview && !isMobileScreen && (
          <ResizablePanel minSize={minSizeOfWindow}>
            <Window window={2} />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </main>
  );
};

export default Workspace;
