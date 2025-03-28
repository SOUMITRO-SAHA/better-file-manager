import {
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { cn } from "@/lib/utils";
import { IDisk } from "@/types/system";
import { HardDrive, Laptop } from "lucide-react";
import * as React from "react";

interface SidebarLocationItemProps extends IDisk {}

const SidebarLocationItem: React.FC<SidebarLocationItemProps> = (props) => {
    const { name, mountPoint, availableSpace, totalSpace } = props;

    // --- Store
    const { activeItem, setActiveItem } = useSidebarStore();

    const renderIcon = () => {
        switch (mountPoint) {
            case "/":
                return <Laptop className="w-4 h-4" />;
            default:
                return <HardDrive className="w-4 h-4" />;
        }
        return null;
    };

    return (
        <SidebarMenuSubItem key={name}>
            <SidebarMenuSubButton
                className={cn(
                    "capitalize cursor-default",
                    activeItem.name === name && "bg-muted",
                )}
                onClick={() =>
                    setActiveItem({
                        name,
                        mountPoint,
                        availableSpace,
                        totalSpace,
                    })
                }
            >
                {renderIcon()}
                <span className="text-sm">{name}</span>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
};

export default SidebarLocationItem;
