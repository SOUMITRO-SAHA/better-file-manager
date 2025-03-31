import * as React from "react";
import Workspace from "./components/custom/workspace/workspace";
import AppLayout from "./components/layouts/app-layout";
import { TooltipProvider } from "./components/ui/tooltip";
import "@/lib/configs";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <TooltipProvider>
      <AppLayout>
        <Workspace />
      </AppLayout>
    </TooltipProvider>
  );
};

export default App;
