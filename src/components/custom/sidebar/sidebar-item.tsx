import {
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ISidebarItem } from "@/constants/default";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SidebarItemProps {
    item: ISidebarItem;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item } = props;

    // --- Store
    const { activeItem, setActiveItem } = useSidebarStore();

    return (
        <SidebarMenuSubItem key={item.name}>
            <SidebarMenuSubButton
                className={cn(
                    "capitalize cursor-default",
                    activeItem.name === item.name && "bg-muted",
                )}
                onClick={() => setActiveItem(item)}
            >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="text-sm">{item.name}</span>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
};

export default SidebarItem;
