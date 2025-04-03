import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ITag } from "@/lib/constants/default";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import * as React from "react";

interface SidebarTagItemsProps extends ITag {}

export const SidebarTagItems: React.FC<SidebarTagItemsProps> = (props) => {
  const { name, color } = props;

  // --- Store
  const { activeItem, setActiveItem } = useSidebarStore();

  return (
    <SidebarMenuSubItem key={name}>
      <SidebarMenuSubButton
        className={cn(
          "capitalize cursor-default select-none",
          activeItem.name === name && "bg-muted",
        )}
        onClick={() =>
          setActiveItem({
            name,
            color,
          })
        }
      >
        <Circle className="h-2 w-2" style={{ fill: color, stroke: color }} />
        <span className="text-sm">{name}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

export default SidebarTagItems;
