import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import useSystem from "@/hooks/useSystem";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import * as React from "react";
import SidebarTogglableGroupItem from "./sidebar-togglable-group-item";
import { defaultTags } from "@/lib/constants/default";

interface AppSidebarProps {}

const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  // --- Store
  const { sidebarData, setSidebarData } = useSidebarStore();

  // --- Hook
  const { disks, favourites } = useSystem();

  // --- Effects
  React.useEffect(() => {
    if (disks && favourites) {
      if (sidebarData === null) {
        setSidebarData({
          favourites: favourites,
          locations: disks,
        });
      }
    }
  }, [disks, favourites]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <ScrollArea className="w-full h-svh">
        <SidebarContent>
          {sidebarData &&
            Object.entries(sidebarData).map(([title, items], _idx) => {
              return (
                <SidebarTogglableGroupItem
                  key={`${title}__${_idx}`}
                  title={title}
                  items={items}
                />
              );
            })}

          {/* Network */}

          {/* Tags */}
          {Object.entries(defaultTags).map(([title, items], _idx) => {
            return (
              <SidebarTogglableGroupItem
                key={`${title}__${_idx}`}
                title={title}
                items={items}
              />
            );
          })}
        </SidebarContent>
        <SidebarFooter />
      </ScrollArea>
    </Sidebar>
  );
};

export default AppSidebar;
