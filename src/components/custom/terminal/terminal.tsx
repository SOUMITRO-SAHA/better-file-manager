import { cn } from "@/lib/utils";
import * as React from "react";
import TerminalHeader from "./terminal-header";
import TerminalBody from "./terminal-body";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalProps {
  close: () => void;
}

const Terminal: React.FC<TerminalProps> = (props) => {
  const { close } = props;

  const [command, setCommand] = React.useState<string[]>([]);

  // --- Handlers
  const handleCommand = (command: string) => {
    if (command.trim()) {
      setCommand((prev) => [...prev, command]);
    }
  };

  return (
    <div className={cn("w-full h-full flex flex-col")}>
      {/* Terminal Header */}
      <div className="flex-none">
        <TerminalHeader close={close} />
      </div>

      {/* Terminal Body */}
      <ScrollArea className="flex-1 overflow-auto">
        <TerminalBody
          commands={command}
          onCommand={handleCommand}
          currentFolder="demo"
        />
      </ScrollArea>
    </div>
  );
};

export default Terminal;
