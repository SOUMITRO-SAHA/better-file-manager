import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ISidebarItem } from "@/lib/constants/default";
import { useFileStore } from "@/lib/store/fileStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SidebarItemProps {
  item: ISidebarItem;
  iconColor?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { item, iconColor = "" } = props;

  // --- Store
  const { activeItem, setActiveItem } = useSidebarStore();
  const { setSelectedPath, setDeepestPath } = useFileStore();

  return (
    <SidebarMenuSubItem key={item.name}>
      <SidebarMenuSubButton
        className={cn(
          "capitalize cursor-default select-none",
          activeItem.name === item.name && "bg-muted",
        )}
        onClick={() => {
          setActiveItem(item);
          setSelectedPath(item.mountPoint);
          setDeepestPath(item.mountPoint);
        }}
      >
        {item.icon && (
          <item.icon className={cn("w-4 h-4")} style={{ color: iconColor }} />
        )}
        <span className="text-sm">{item.name}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

export default SidebarItem;
