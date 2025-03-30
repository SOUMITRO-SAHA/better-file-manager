import * as React from "react";
import AppSidebar from "../custom/sidebar/app-sidebar";
import { ThemeProvider } from "../theme-provider";
import { SidebarProvider } from "../ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="better-file-manager-theme">
      <SidebarProvider>
        <AppSidebar />
        {props.children}
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
