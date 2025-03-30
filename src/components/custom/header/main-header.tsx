import { SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";

interface MainHeaderProps {
  children?: React.ReactNode;
  window?: 1 | 2;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { children, window } = props;
  return (
    <div className="">
      {window === 1 && <SidebarTrigger />}
      {children}
    </div>
  );
};

export default MainHeader;
