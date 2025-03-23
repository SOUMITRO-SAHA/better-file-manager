import * as React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return <main className="h-svh w-svw overflow-hidden">{props.children}</main>;
};

export default AppLayout;
