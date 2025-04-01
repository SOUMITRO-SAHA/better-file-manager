import { cn } from "@/lib/utils";
import * as React from "react";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = (props) => {
  const { children } = props;

  return <main className={cn("container mx-auto max-w-7xl")}>{children}</main>;
};

export default GeneralLayout;
