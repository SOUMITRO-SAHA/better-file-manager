import { cn } from "@/lib/utils";
import * as React from "react";
import MainHeader from "../header/main-header";

interface WindowProps {
  className?: string;
  window?: 1 | 2;
}

const Window: React.FC<WindowProps> = (props) => {
  const { className, window } = props;

  return (
    <section className={cn("w-full h-full", className)}>
      <MainHeader window={window}></MainHeader>
    </section>
  );
};

export default Window;
