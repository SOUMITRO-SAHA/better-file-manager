import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { ESidebarGroup, ISidebarItem, ITag } from "@/lib/constants/default";
import { cn } from "@/lib/utils";
import { IDisk } from "@/types/system";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import SidebarItem from "./sidebar-item";
import SidebarLocationItem from "./sidebar-location-items";
import SidebarTagItems from "./sidebar-tag-items";

interface SidebarTogglableGroupItemProps {
  title: string;
  items: ISidebarItem[] | IDisk[] | ITag[];
  className?: string;
}

const SidebarTogglableGroupItem: React.FC<SidebarTogglableGroupItemProps> = (
  props,
) => {
  const { title, items, className } = props;

  return (
    <SidebarGroup className={cn("p-0", className)}>
      <SidebarMenu>
        <Collapsible key={title} defaultOpen className="group/collapsible">
          <CollapsibleTrigger className="hover:bg-transparent" asChild>
            <SidebarMenuButton
              tooltip={title}
              className="capitalize hover:bg-transparent"
            >
              <SidebarGroupLabel>{title}</SidebarGroupLabel>
              <ChevronDown className="w-4 h-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((item) => {
                switch (title) {
                  case ESidebarGroup.FAVOURITES:
                    return (
                      <SidebarItem
                        key={item.name}
                        item={item as ISidebarItem}
                        iconColor={"var(--color-blue-500)"}
                      />
                    );
                  case ESidebarGroup.LOCATIONS:
                    return (
                      <SidebarLocationItem
                        key={item.name}
                        iconColor={"var(--color-gray-500)"}
                        {...(item as IDisk)}
                      />
                    );
                  case ESidebarGroup.TAGS:
                    return (
                      <SidebarTagItems
                        key={item.name}
                        iconColor={"var(--color-gray-500)"}
                        {...(item as ITag)}
                      />
                    );
                }

                return null;
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarTogglableGroupItem;
