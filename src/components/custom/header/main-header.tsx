import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
  window?: 1 | 2;
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { children, window, className } = props;
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
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Backwork</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
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
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
              <Terminal />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Terminal</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default MainHeader;
