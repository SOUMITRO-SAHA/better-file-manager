import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import * as React from "react";

interface TerminalProps {
  close: () => void;
}

const Terminal: React.FC<TerminalProps> = (props) => {
  const { close } = props;

  return (
    <div className={cn("w-full h-full")}>
      {/* Terminal Header */}
      <div className="h-auto w-full bg-popover px-4border-b flex justify-between items-center">
        <div className="px-2">~/download/test</div>
        <Button variant={"ghost"} size={"icon"} onClick={close}>
          <X />
        </Button>
      </div>

      {/* Terminal Body */}
      <div className="px-4 p-2">
        <h1>Hello World!!!</h1>
      </div>
    </div>
  );
};

export default Terminal;
