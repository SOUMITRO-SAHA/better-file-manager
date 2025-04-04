import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useNavigation from "@/hooks/useNavigation";
import { useAppStore } from "@/lib/store/appStore";
import { cn } from "@/lib/utils";
import { pathChange } from "@/lib/utils/common";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Terminal,
  X,
} from "lucide-react";
import * as React from "react";

interface MainHeaderProps {
  children?: React.ReactNode;
  window: 1 | 2;
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { children, window, className } = props;

  // --- Store
  const {
    setToggleSplitView,
    showTerminals,
    setTerminalState,
    activeWindowIndex,
  } = useAppStore();

  const shouldShowTerminal = showTerminals?.[window - 1];

  // --- Hooks
  const { isForwardAvailable, isBackwardAvailable } = useNavigation();

  return (
    <div
      className={cn(
        "flex justify-between items-center space-x-2 flex-wrap",
        className,
      )}
    >
      <div className="flex items-center">
        {window === 1 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Sidebar</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="ml-auto"
              disabled={!isBackwardAvailable}
              onClick={() => {
                pathChange({
                  direction: "backward",
                });
              }}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Backwork</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="ml-auto"
              disabled={!isForwardAvailable}
              onClick={() => {
                pathChange({
                  direction: "forward",
                });
              }}
            >
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Forward</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {children}

      <div className="flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
              <List />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List View</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
              <LayoutGrid />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid View</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="ml-auto"
              onClick={() => {
                const newActiveWindowIndex = (activeWindowIndex - 1) as 0 | 1;
                setTerminalState(newActiveWindowIndex, !shouldShowTerminal);
              }}
            >
              <Terminal />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Terminal</p>
          </TooltipContent>
        </Tooltip>
        {window === 2 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  setToggleSplitView();
                }}
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
