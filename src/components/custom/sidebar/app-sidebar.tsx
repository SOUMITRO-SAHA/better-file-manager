import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
} from "@/components/ui/sidebar";
import { defaultSidebar, SidebarType } from "@/constants/default";
import * as React from "react";
import SidebarTogglableGroupItem from "./sidebar-togglable-group-item";
import useSystem from "@/hooks/useSystem";

interface AppSidebarProps {}

const AppSidebar: React.FC<AppSidebarProps> = (props) => {
    const [sidebar, setSidebar] = React.useState<SidebarType>(defaultSidebar);
    // --- Hook
    const { disks } = useSystem();
    console.log("Disk: ", disks);

    // --- Effect
    React.useEffect(() => {
        if (disks && Array.isArray(disks) && disks.length > 0) {
            setSidebar((prev) => ({
                ...prev,
                locations: disks,
            }));
        }
    }, [disks]);

    return (
        <Sidebar collapsible="icon" {...props}>
            <ScrollArea className="w-full h-svh">
                <SidebarContent>
                    {Object.entries(sidebar).map(([title, items], _idx) => {
                        return (
                            <SidebarTogglableGroupItem
                                key={title}
                                title={title}
                                items={items}
                            />
                        );
                    })}
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </ScrollArea>
        </Sidebar>
    );
};

export default AppSidebar;
