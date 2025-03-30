import { cn } from "@/lib/utils";
import * as React from "react";

interface TerminalBodyProps {
  currentFolder?: string;
  commands: string[];
  onCommand: (command: string) => void;
}

const TerminalBody: React.FC<TerminalBodyProps> = (props) => {
  const { currentFolder, commands, onCommand } = props;

  // --- State
  const [input, setInput] = React.useState<string>("");

  // --- Ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // --- Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      onCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className={cn("p-4 font-mono text-sm overflow-y-auto h-full")}
      onClick={() => inputRef.current?.focus()}
    >
      {commands.map((command, index) => (
        <div
          key={`${command}__${index}`}
          className="mb-2 text-muted-foreground"
        >
          <span className="text-green-500 font-semibold mr-2">$</span>
          {currentFolder && (
            <span className="text-amber-200 font-semibold mr-2">
              ({currentFolder})
            </span>
          )}
          {command}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-green-500 font-semibold mr-2">$</span>
        {currentFolder && (
          <span className="text-amber-200 font-semibold">
            ({currentFolder})
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-white outline-none ml-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default TerminalBody;
