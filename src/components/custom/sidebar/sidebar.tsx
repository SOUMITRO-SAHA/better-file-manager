import * as React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return <aside className="">{props.children}</aside>;
};

export default Sidebar;
