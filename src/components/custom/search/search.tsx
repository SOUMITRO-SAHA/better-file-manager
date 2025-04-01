import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import * as React from "react";

interface SearchBarProps {
  className?: string;
}

export interface SearchBarHandle {
  focusInput: () => void;
}

export const SearchBar = React.forwardRef<SearchBarHandle, SearchBarProps>(
  (props, ref) => {
    const { className } = props;

    // --- Ref
    const inputRef = React.useRef<HTMLInputElement>(null);

    // --- Functions
    React.useImperativeHandle(ref, () => ({
      focusInput: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    return (
      <div className={cn("", className)}>
        <Input
          ref={inputRef}
          prefixIcon={<SearchIcon className="w-4 h-4" />}
          type="text"
          placeholder="Search..."
        />
      </div>
    );
  },
);

export default SearchBar;
