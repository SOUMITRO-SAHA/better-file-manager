import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import * as React from "react";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { className } = props;

  return (
    <div className={cn("", className)}>
      <Input
        prefixIcon={<SearchIcon className="w-4 h-4" />}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
