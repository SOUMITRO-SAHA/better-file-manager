import * as React from "react";
import AppSidebar from "../custom/sidebar/app-sidebar";
import { ThemeProvider } from "../theme-provider";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="better-file-manager-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-svh w-svw overflow-hidden">
          <SidebarTrigger />
          {props.children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
