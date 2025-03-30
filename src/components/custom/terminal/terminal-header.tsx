import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import * as React from "react";

interface TerminalHeaderProps {
  className?: string;
  close: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = (props) => {
  const { className, close } = props;

  return (
    <div
      className={cn(
        "h-auto w-full bg-popover px-4border-b flex justify-between items-center",
        className,
      )}
    >
      <div className="px-2 flex items-center space-x-2">
        <span className="border border-green-500 w-3 h-3 rounded-full flex justify-center items-center">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
        </span>
        <span>~/download/test</span>
      </div>
      <Button variant={"ghost"} size={"icon"} onClick={close}>
        <X />
      </Button>
    </div>
  );
};

export default TerminalHeader;
